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
  const [editedTest, setEditedTest] = React.useState<any>(null);
  const [viewTest, setViewTest] = React.useState<any>(null);
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);
  let TEST_RECORD = {
    id: 999,
    projectName: '',
    testSuiteName: '',
    testCaseName: '',
    testScript: ''
  };

  const [recordings, setRecordings] = React.useState([]);

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
      chrome.storage.local.get(['status', 'codeBlocks', 'recordings'], result => {
        if (result.recordings) setRecordings(result.recordings);
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

  React.useEffect((): void => {
    if (chrome.storage) {
      chrome.storage.local.set({ recordings: recordings });
    }
  }, [recordings]);

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
    if([ControlAction.START, ControlAction.STOP, ControlAction.RESET, ControlAction.MOVE, ControlAction.PUSH].includes(action)) {
      if (action === ControlAction.START) startRecording();
      else if (action === ControlAction.STOP) stopRecording();
      else if (action === ControlAction.RESET) resetRecording();
      chrome.runtime.sendMessage({ type: action });
    }
  };

  const toggleInfoDisplay = (test: any): void => {
    setShouldInfoDisplay(should => !should);
    setViewTest(test)
  };

  const toggleEditDisplay = (test: any): void => {
    setShouldEditDisplay(should => !should);
    setEditedTest(test);
    setCodeBlocks(getCodeBlocksFromString(test.testScript))
  };

  const getCodeBlocksAsString = (): String => {
    let codeAsString: string = '';
    for (let i = 0; i !== codeBlocks.length; i += 1) {
      codeAsString += codeBlocks[i].value.concat('\n');
    }
    return codeAsString;
  };

  const getCodeBlocksFromString = (codeAsString: String): Block[] => {
    let codeLinesList = codeAsString.split('\n');
    codeLinesList.pop();
    let codeAsBlocks = [];
    codeLinesList.forEach(function (line, index) {
      let block = {id: '', value: ''};
      block.id = index.toString();
      block.value = line;
      codeAsBlocks.push(block);
    });
    setCodeBlocks(codeAsBlocks);

    return codeAsBlocks;
  };

  const handleSave = (): void => {
    handleToggle(ControlAction.SAVE);
    setShouldEditDisplay(false);
    let currentTestRecord, recordingsCopy = [...recordings];
    if(editedTest && shouldEditDisplay) {
      currentTestRecord = recordings.filter(function (record) {
        return record.id === editedTest.id;
      })[0];
      currentTestRecord.testCaseName = (document.getElementById('test-name') as HTMLInputElement).value;
      currentTestRecord.testScript = getCodeBlocksAsString();
      setEditedTest(null);
      recordingsCopy[editedTest.id] = currentTestRecord;
      setRecordings([...recordingsCopy]);
    } else {
      currentTestRecord = Object.create(TEST_RECORD);
      currentTestRecord.id = recordings.length;
      currentTestRecord.testCaseName = (document.getElementById('test-name') as HTMLInputElement).value;
      currentTestRecord.projectName = 'Prisma';
      currentTestRecord.testSuiteName = ' Campaign Buy';
      currentTestRecord.testScript = getCodeBlocksAsString();
      setRecordings([...recordingsCopy, currentTestRecord]);
    }
    resetRecording();
  };

  const handleDelete = (id): void => {
    handleToggle(ControlAction.DELETE);
    const updatedRecords = recordings.filter(function (record) {
      return record.id !== id;
    });
    setRecordings(updatedRecords);
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
        {shouldInfoDisplay && <Info testInfo={viewTest}/>}
        {shouldEditDisplay && <EditTest test={editedTest} codeBlocks={codeBlocks} destroyBlock={destroyBlock} moveBlock={moveBlock}/>}
        {!shouldEditDisplay && !shouldInfoDisplay && <Body
            codeBlocks={codeBlocks}
            recStatus={recStatus}
            recordings={recordings}
            action={action}
            setAction={setAction}
            handleDelete={handleDelete}
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
            handleSave={handleSave}
            recStatus={recStatus}
            action={action}
            handleToggle={handleToggle}
            copyToClipboard={copyToClipboard}
        />
      </div>
  );
};
