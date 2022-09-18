
import { BsCardImage } from 'react-icons/bs'
import { AiOutlineLink, AiOutlineCloudUpload } from 'react-icons/ai'
import { FaYoutube } from 'react-icons/fa'
import { MdPermMedia } from 'react-icons/md'
import { UploadProps, message, Upload, Divider } from 'antd';
import { stateToHTML } from "draft-js-export-html";


import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createUndoPlugin from '@draft-js-plugins/undo';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createVideoPlugin from '@draft-js-plugins/video';

import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css'
import '@draft-js-plugins/undo/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/anchor/lib/plugin.css'
import '@draft-js-plugins/inline-toolbar/lib/plugin.css'
import '@draft-js-plugins/hashtag/lib/plugin.css';

import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';
import blockTypeSelectStyles from './blockTypeSelectStyles.module.css';
import createHashtagPlugin from '@draft-js-plugins/hashtag';

import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import { convertFromRaw, EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import editorStyles from './editor.module.css';

import mockUpload from './mockUpload.js';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Popover from 'src/component/atoms/popover';
import { Button, Card, Modal, Tab, TextField } from '@mui/material';
import { Input, Tabs } from 'antd';
import { TabsContext } from '@mui/base';
import { TabList, TabPanel } from '@mui/lab';
import { GET } from 'src/lib/axios';
import moment from 'moment';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const sideToolbarPlugin = createSideToolbarPlugin({
  position: 'left',
  theme: { buttonStyles, toolbarStyles, blockTypeSelectStyles },
});
const undoPlugin = createUndoPlugin();
const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const videoPlugin = createVideoPlugin();

const { UndoButton, RedoButton } = undoPlugin;
const { AlignmentTool } = alignmentPlugin;
const { Toolbar } = staticToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin
const { InlineToolbar } = inlineToolbarPlugin;
const { types } = videoPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  staticToolbarPlugin,
  sideToolbarPlugin,
  undoPlugin,
  linkifyPlugin,
  inlineToolbarPlugin, 
  linkPlugin,
  hashtagPlugin,
  videoPlugin
];


const MyEditor = ({onChangeEditor}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorRef = useRef(null)
  const onChange = (editorState:any) => {
    setEditorState(editorState)
    
    const options = {
      entityStyleFn: (entity) => {
        const entityType = entity.get('type').toLowerCase();
          if (entityType === 'draft-js-video-plugin-video') {
            const data = entity.getData();
            return {
              element: 'video',
              attributes: {
                src: data.src,
              },
            };
          }
          return null;
      },
    };
  
      const byStateToHTML = stateToHTML(editorState.getCurrentContent(), options)
      onChangeEditor(byStateToHTML)
  };


  return (
    <NoSsr>
      <div className={`border-4`} >
        <Toolbar >
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Fragment>
                      <BoldButton {...externalProps} />
                      <ItalicButton {...externalProps} />
                      <UnderlineButton {...externalProps} />
                      <CodeButton {...externalProps} />
                      <Separator {...externalProps} />
                      <HeadlinesButton {...externalProps} />
                      <UnorderedListButton {...externalProps} />
                      <OrderedListButton {...externalProps} />
                      <BlockquoteButton {...externalProps} />
                      <ImageAdd
                        editorState={editorState}
                        onChange={onChange}
                        modifier={imagePlugin.addImage}
                      />
                      <VideoAdd 
                        editorState={editorState}
                        onChange={onChange}
                        modifier={imagePlugin.addImage}
                    />
                    </Fragment>
                  </div>
                  <div className='flex items-center '>
                      <UndoButton />
                      <RedoButton />
                  </div>
                </div>
              )
            }
        </Toolbar>
        <div className='p-5'>
          <Editor 
            editorState={editorState} 
            onChange={setEditorState}
            plugins={plugins}
            ref={editorRef}
          />
        </div>
         <AlignmentTool />
      </div>
      
      
        <SideToolbar >
          {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div className='grid grid-cols-2'>
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                  <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    
                </div>
              )
            }
        </SideToolbar>

        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
    </NoSsr>
  )
}

const { Dragger } = Upload;

// insert image
const ImageAdd = ({ editorState, onChange, modifier }:any) => {
  
  const [ uri, setUri ] = useState('')

  const insertImage = async (url=uri) => {
    const imagePlugin = createImagePlugin();
    const newEditorState = imagePlugin.addImage(editorState, url, {});
    onChange(newEditorState)
  };
  
  const [ allMediaImage, setAllMediaImage ] = useState([])

  useEffect(() => {
    GET(`api/broadcast/allData`)
      .then(res => {
        setAllMediaImage(res?.data?.data)
      })
  },[])

  const refBtnTrigger = useRef(null)
  // type insert 
  // 1 = link
  // 2 = upload image
  // 3 = select from media
  const [ typeInsert, setTypeInsert ] = useState(1)

  const uploadedDragProps = { name: 'file', multiple: true, action: `${process.env.REACT_APP_ENP_BE}api/broadcast/addImage`, onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        const url = info.file?.response?.path
        const imagePlugin = createImagePlugin();
        const newEditorState = imagePlugin.addImage(editorState, url, {});
        onChange(newEditorState)
        refBtnTrigger?.current?.click()
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  return (
    <Fragment>

      <Modal
        open={typeInsert === 3}  
        onClose={() => {
          setTypeInsert(1)
          refBtnTrigger.current?.click()
        }}
      >

        <div className='absolute w-1/2 bg-white' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <p className='text-2xl font-semibold text-center p-5'>Select from Media</p>
          <Divider />
          <div className='mt-5 masonry-3-col tablet:masonry-3-col laptop:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit bg-gray-100 p-2 shadow border'>
              {allMediaImage?.map((val, index) => (
                <Card className='p-2 cursor-pointer hover:shadow-xl' onClick={() => {
                  insertImage(val?.imageUrl)
                  setTypeInsert(1)
                  refBtnTrigger.current.click()
                }}>
                  <img src={`${val.imageUrl}`} />
                </Card>
              ))}
            </div>
        </div>
      </Modal>
      
      <div className={editorStyles.headlineButtonWrapper}>
        <div className={editorStyles.headlineButton}>
            <Popover 
              label={
                <div className='h-full flex items-center justify-center cursor-pointer' ref={refBtnTrigger}>
                    <BsCardImage />
                </div>
              }
              content={
                <div className='bg-white border'>
                  
                  <div className='flex items-center' style={{ minWidth: '23rem' }}>
                    <div className='hover:bg-gray-100 p-2' onClick={() => setTypeInsert(1)}>
                      <AiOutlineLink size={20} color='gray' />
                    </div>
                    <div className='hover:bg-gray-100 p-2' onClick={() => setTypeInsert(2)}>
                      <AiOutlineCloudUpload size={20} color='gray' />
                    </div>
                    <div className='hover:bg-gray-100 p-2' onClick={() => setTypeInsert(3)}>
                      <MdPermMedia size={20} color='gray' />
                    </div>
                  </div>
                  {typeInsert === 1 ? (
                    <div className='p-2 border w-full flex items-center'>
                      <Input 
                        className='border p-1'
                        style={{ width: '100%' }}
                        placeholder='image url'
                        title='Url'
                        value={uri}
                        onChange={e => setUri(e.target.value)}
                        />
                        <Button variant='contained' size='small' className='p-2 w-20 mt-3'>save</Button>
                    </div>
                  ) : typeInsert === 2 ? (
                    <Dragger {...uploadedDragProps}>
                      <div className='p-5 border m-1'>
                        <div className='flex items-center justify-center w-full'>
                            <AiOutlineCloudUpload size={50} />
                        </div>
                        <p className="ant-upload-text text-center text-xs">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint text-center text-xs">
                          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                          band files
                        </p>
                      </div>
                    </Dragger>
                  ) : null}
                </div>
              }
            />
        </div>
      </div>
      {/* <button onClick={handleClick}></button> */}
    </Fragment>
  )
}

// const ChooseImageUploadType = () => {
//   return (
//     <div className='bg-white p-2 border w-96'>
//       <Input 
//         className='border outline-none'
//         placeholder='image url'
//         title='Url'
//         value={uri}
//         onChange={e => setUri(e.target.value)}
//         addonAfter={
//           <button className='p-2'>save</button>
//         }
//       />
//     </div>
//   )
// }

// insert image


const VideoAdd = ({ editorState, onChange, modifier }:any) => {
  
  const [ uri, setUri ] = useState('')
  const refBtnTrigger = useRef(null)
  const SaveVideo = async () => {
    const videoPlugin = createVideoPlugin()
    const newEditorState = videoPlugin.addVideo(editorState, { src: uri })
    refBtnTrigger.current?.click()
    onChange(newEditorState)
  };

  
  return (
    <div className={editorStyles.headlineButtonWrapper}>
        <div className={editorStyles.headlineButton}>
            <Popover 
              label={
                <div className='h-full flex items-center justify-center cursor-pointer' ref={refBtnTrigger}>
                    <FaYoutube />
                </div>
              }
              content={
                <div className='bg-white border'>
                  <div className='p-2 border w-full flex items-center'>
                    <Input 
                      className='border p-1'
                      style={{ width: '100%' }}
                      placeholder='youtube video link'
                      title='Url'
                      value={uri}
                      onChange={e => setUri(e.target.value)}
                      />
                      <Button variant='contained' size='small' className='p-2 w-20 mt-3' onClick={SaveVideo}>save</Button>
                  </div>
                </div>
              }
            />
        </div>
      </div>
  )
}


class HeadlinesPicker extends React.Component<any, any> {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => (
          // eslint-disable-next-line
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends React.Component<any, any> {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={editorStyles.headlineButtonWrapper}>
        <button onClick={this.onClick} className={editorStyles.headlineButton}>
          H
        </button>
      </div>
    );
  }
}

const NoSsr = (props:any) => {
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
      setMounted(true);
    }, [])
    return <>
      { mounted ? props.children : null }
    </>
  }

  export default MyEditor