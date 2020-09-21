import * as React from 'react';
import Header from './Header';
import Info from './Info';
import Footer from './Footer';
import Body from './Body';
import {ActionWithPayload, Block} from '../../types';
import {ControlAction, RecState} from '../../constants';
import '../../assets/styles/styles.scss';
import EditTest from "./EditTest";

export default () => {
  const [recStatus, setRecStatus] = React.useState<RecState>(RecState.OFF);
  const [action, setAction] = React.useState<ControlAction>(ControlAction.STOP_EDIT);
  const [codeBlocks, setCodeBlocks] = React.useState<Block[]>([]);
  const [shouldInfoDisplay, setShouldInfoDisplay] = React.useState<boolean>(false);
  const [shouldEditDisplay, setShouldEditDisplay] = React.useState<boolean>(false);
  const [editedTest, setEditedTest] = React.useState<ControlAction>(null);
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);

  let tableRows = [
    {"id": "1", "project": "Prisma", "module": "Campaign Buy", "case": "Create Placement"},
    {"id": "2", "project": "Prisma", "module": "Campaign Buy", "case": "Create Package"},
    {"id": "3", "project": "Prisma", "module": "Campaign Orders", "case": "Create Order"}
  ];

  const startRecording = (): void => {
    setRecStatus(RecState.ON);
  };
  const stopRecording = (): void => {
    setRecStatus(RecState.PAUSED);
  };
  const resetRecording = (): void => {
    setRecStatus(RecState.OFF);
    setCodeBlocks([]);
  };

  const startEditing = (): void => {
    setAction(ControlAction.EDIT);
  };

  const stopEditing = (): void => {
    setAction(ControlAction.STOP_EDIT);
  };

  React.useEffect((): void => {
    if (chrome.storage) {
      chrome.storage.local.get(['status', 'codeBlocks'], result => {
        if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
        if (result.status === RecState.ON) setRecStatus(RecState.ON);
        else if (result.status === RecState.PAUSED) setRecStatus(RecState.PAUSED);
      });
    }
    if (chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, activeTab => {
        if (activeTab[0].url.startsWith('chrome://')) setIsValidTab(false);
      });
    }
  }, []);

  React.useEffect((): () => void => {
    function handleMessageFromBackground({ type, payload }: ActionWithPayload): void {
      setShouldInfoDisplay(false);
      if (type === ControlAction.START && isValidTab) startRecording();
      else if (type === ControlAction.STOP) stopRecording();
      else if (type === ControlAction.RESET) resetRecording();
      else if (type === ControlAction.EDIT) startEditing();
      else if (type === ControlAction.STOP_EDIT) stopEditing();
      else if (type === ControlAction.PUSH) setCodeBlocks(blocks => [...blocks, payload]);
    }
    if (chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    }
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageFromBackground);
    };
  }, []);

  React.useEffect((): void =>{
    setAction(ControlAction.STOP_EDIT);
  }, [recStatus, setAction]);

  const handleToggle = (action: ControlAction): void => {
    if (shouldInfoDisplay) setShouldInfoDisplay(false);
    else if (shouldEditDisplay) setShouldEditDisplay(false);
    if (action === ControlAction.START) startRecording();
    else if (action === ControlAction.STOP) stopRecording();
    else if (action === ControlAction.RESET) resetRecording();
    chrome.runtime.sendMessage({ type: action });
  };

  const toggleInfoDisplay = (): void => {
    setShouldInfoDisplay(should => !should);
  };

  const toggleEditDisplay = (test: any): void => {
    setShouldEditDisplay(should => !should);
    setEditedTest(test);
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      let toBeCopied: string = '';
      for (let i = 0; i !== codeBlocks.length; i += 1) {
        toBeCopied += codeBlocks[i].value.concat('\n');
      }
      await navigator.clipboard.writeText(toBeCopied);
    } catch (error) {
      throw new Error(error);
    }
  };

  const destroyBlock = (index: number): void => {
    setCodeBlocks(prevBlocks => prevBlocks.filter((block, i) => i !== index));
    chrome.runtime.sendMessage({
      type: ControlAction.DELETE,
      payload: index,
    });
  };

  const moveBlock = (dragIdx: number, dropIdx: number): void => {
    const temp = [...codeBlocks];
    const dragged = temp.splice(dragIdx, 1)[0];
    temp.splice(dropIdx, 0, dragged);
    setCodeBlocks(temp);
    chrome.runtime.sendMessage({
      type: ControlAction.MOVE,
      payload: { dragIdx, dropIdx },
    });
  };

  return (
    <div id="App">
      <Header shouldInfoDisplay={shouldInfoDisplay} toggleInfoDisplay={toggleInfoDisplay}/>
      {shouldInfoDisplay && <Info/>}
      {shouldEditDisplay && <EditTest test={editedTest}/>}
      {!shouldEditDisplay && !shouldInfoDisplay && <Body
          codeBlocks={codeBlocks}
          recStatus={recStatus}
          action={action}
          setAction={setAction}
          tableRows={tableRows}
          isValidTab={isValidTab}
          destroyBlock={destroyBlock}
          moveBlock={moveBlock}
          toggleInfoDisplay={toggleInfoDisplay}
          toggleEditDisplay={toggleEditDisplay}
      />}
      <Footer
        isValidTab={isValidTab}
        shouldInfoDisplay={shouldInfoDisplay}
        shouldEditDisplay={shouldEditDisplay}
        recStatus={recStatus}
        action={action}
        handleToggle={handleToggle}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
};
