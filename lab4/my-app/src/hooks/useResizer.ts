import React, { useEffect, useRef } from "react";
import {Block} from "./../types";
import {dispatch} from './../state'
import {resizeBlock} from './../actions/block';
import { BlockHelper } from "../components/Blocks/DopHelper/BlockHelp";

type propsUseResizer =  {
  block:Block,
  refs:{
    ref: React.RefObject<HTMLDivElement>,
    refLeft:React.RefObject<HTMLDivElement>,
    refTop:React.RefObject<HTMLDivElement>,
    refRight:React.RefObject<HTMLDivElement>,
    refBottom:React.RefObject<HTMLDivElement>,
  },
  setSize: React.Dispatch<React.SetStateAction<{
    width: number,
    height: number,
  }>>,
  setPos: React.Dispatch<React.SetStateAction<{
    x: number,
    y: number,
  }>>,
}

function useResizer(props: propsUseResizer): void {
  const coords = useRef<{
    x: number,
    y: number,
    delta: number,
  }>({
    x: props.block.coordinatesX,
    y: props.block.coordinatesY,
    delta: 0,
  })

  const size = useRef<{
    height: number,
    width: number,
  }>({
    height: props.block.height,
    width: props.block.width,
  })

  const isClickedR = useRef<boolean>(false);
  const isClickedL = useRef<boolean>(false);
  const isClickedB = useRef<boolean>(false);
  const isClickedT = useRef<boolean>(false);

  useEffect(() => {
    const main = document.getElementById("main")!;
    const styleMain = window.getComputedStyle(main);
    const width = parseInt(styleMain.width, 10);
    const height = parseInt(styleMain.height, 10);

    const elementRef = props.refs.ref.current!;
    const el = document.getElementById(props.block.id)!;
    const elRight = props.refs.refRight.current!;
    const elBottom = props.refs.refBottom.current!;
    const elLeft = props.refs.refLeft.current!;
    const elTop = props.refs.refTop.current!;

    // Right resize
    const onMouseMoveRightResize = (event:MouseEvent) => {
      if (!isClickedR.current) return;

      coords.current.delta = event.pageX - coords.current.x;
      coords.current.x = event.pageX;
      if(size.current.width <= 5) 
        size.current.width = 5;
      size.current.width = size.current.width + coords.current.delta;

      //el.style.width = `${size.current.width}px`;

      el.style.left = `${event.pageX - size.current.width}px`;
      el.style.top = `${props.block.coordinatesY}px`;
      el.style.right = `${event.pageX}px`
      el.style.bottom = `${height - (props.block.coordinatesY + size.current.height)}px`;

      props.setSize(sizer =>({
        ...sizer,
        width: size.current.width,
      }));

      // props.setPos(pos=>({
      //   ...pos,
      //   x: event.pageX - size.current.width,
      // }));     
    };

    const onMouseUpRightResize = (event:MouseEvent) => {
      if (!isClickedR.current) return;
      isClickedR.current = false;
      dispatch(resizeBlock,{
        width:size.current.width, 
        height:size.current.height, 
        id:props.block.id,
        rejectedCoordinatY:el.getBoundingClientRect().top,
        rejectedCoordinatX:el.getBoundingClientRect().left,
      });
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event:MouseEvent) => {
      isClickedR.current = true;
      coords.current.x = event.pageX;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      elRight.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event:MouseEvent) => {
      if (!isClickedL.current) return;

      coords.current.delta = event.pageX - coords.current.x;
      coords.current.x = event.pageX;
      if(size.current.width <= 5) 
        size.current.width = 5;
      
      size.current.width = size.current.width - coords.current.delta;

      //el.style.width = `${size.current.width}px`;

      el.style.left = `${event.pageX}px`;
      el.style.top = `${props.block.coordinatesY}px`;
      el.style.bottom = `${height - (props.block.coordinatesY + size.current.height)}px`;
      el.style.right = `${event.pageX + size.current.width}px`

      props.setSize(sizer=>({
        ...sizer,
        width: size.current.width,
      }));

      props.setPos(pos=>({
        ...pos,
        x: event.pageX,
      })); 

      //props.block.coordinatesX = event.pageX;
    };

    const onMouseUpLeftResize = (event:MouseEvent) => {
      if(!isClickedL) return;
      isClickedL.current = false;
      dispatch(resizeBlock,{
        width:size.current.width, 
        height:size.current.height, 
        id:props.block.id,
        rejectedCoordinatY:el.getBoundingClientRect().top,
        rejectedCoordinatX:el.getBoundingClientRect().left
      });
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
    };

    const onMouseDownLeftResize = (event:MouseEvent) => {
      isClickedL.current = true;
      coords.current.x = event.pageX;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      elLeft.addEventListener("mouseup", onMouseUpLeftResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event:MouseEvent) => {
      if (!isClickedB.current) return;

      coords.current.delta = event.pageY - coords.current.y;
      coords.current.y = event.pageY;
      if(size.current.height <= 5) 
          size.current.height = 5;
      size.current.height = size.current.height + coords.current.delta;

      //el.style.height = `${size.current.height}px`;

      el.style.top = `${event.pageY - size.current.height}px`;
      el.style.left = `${props.block.coordinatesX}px`;
      el.style.right = `${width - (props.block.coordinatesX + size.current.width)}px`;
      el.style.bottom = `${height - event.pageY}px`

      props.setSize(sizer=>({
        ...sizer,
        height: size.current.height,
      }));

      // props.setPos(pos=>({
      //   ...pos,
      //   y: event.pageY - size.current.height,
      // }));
    };

    const onMouseUpBottomResize = (event:MouseEvent) => {
      if(!isClickedB) return;
      isClickedB.current = false;
      dispatch(resizeBlock,{
        width:size.current.width, 
        height:size.current.height, 
        id:props.block.id,
        rejectedCoordinatY:el.getBoundingClientRect().top,
        rejectedCoordinatX:el.getBoundingClientRect().left,
      });
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event:MouseEvent) => {
      isClickedB.current = true;
      coords.current.y = event.pageY;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      elBottom.addEventListener("mouseup", onMouseUpBottomResize);
    };
    
    // Top resize
    const onMouseMoveTopResize = (event:MouseEvent) => {
      if (!isClickedT.current) return;

      coords.current.delta = event.pageY - coords.current.y;
      coords.current.y = event.pageY;
      if(size.current.height <= 5) 
          size.current.height = 5;
      size.current.height = size.current.height - coords.current.delta;

      //el.style.height = `${size.current.height}px`;

      el.style.top = `${event.pageY}px`;
      el.style.left = `${props.block.coordinatesX}px`;
      el.style.right = `${width - (props.block.coordinatesX + size.current.width)}px`;
      el.style.bottom = `${event.pageY + size.current.height}px`

      props.setSize(sizer=>({
        ...sizer,
        height: size.current.height,
      }));
      
      props.setPos(pos=>({
        ...pos,
        y: event.pageY,
      }));

      //props.block.coordinatesY = event.pageY;
    };

    const onMouseUpTopResize = (event:MouseEvent) => {
      if(!isClickedT) return;
      isClickedT.current = false;
      dispatch(resizeBlock, {
        width: size.current.width, 
        height: size.current.height, 
        id: props.block.id,
        rejectedCoordinatY: el.getBoundingClientRect().top,
        rejectedCoordinatX: el.getBoundingClientRect().left,
      });
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (event:MouseEvent) => {
      isClickedT.current = true;
      coords.current.y = event.pageY;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      elTop.addEventListener("mouseup", onMouseUpTopResize);
    };

    elRight.addEventListener("mousedown", onMouseDownRightResize);
    elTop.addEventListener("mousedown", onMouseDownTopResize);
    elBottom.addEventListener("mousedown", onMouseDownBottomResize);
    elLeft.addEventListener("mousedown", onMouseDownLeftResize);

    const cleanup =  () => {
      elRight.removeEventListener("mousedown", onMouseDownRightResize);
      elTop.removeEventListener("mousedown", onMouseDownTopResize);
      elBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      elLeft.removeEventListener("mousedown", onMouseDownLeftResize);

      elTop.removeEventListener("mouseup", onMouseUpTopResize);
      elBottom.removeEventListener("mouseup", onMouseUpBottomResize);
      elLeft.removeEventListener("mouseup", onMouseUpLeftResize);
      elRight.removeEventListener("mouseup", onMouseUpRightResize);
    };

    return cleanup;

  }, [props.block, props.refs, props.setPos, props.setSize]);
  
}

export default useResizer;