import {SlideBlock} from "./../Block/Block";
import styles from './BlockHelp.module.css'
import {Block} from "../../../types";
import React, { useState } from 'react'
import {selectBlock} from "./../../../actions/blocks/blocks";
import {dispatch} from "./../../../state";
import useDragger from "../../../hooks/useDragger";
import useResizer from "../../../hooks/useResizer";
import { render } from "@testing-library/react";

type propsBlockHelp = {
    idsSelectedBlocks: string[],
    block: Block,
    refs: React.MutableRefObject<HTMLDivElement[]>,
}

export function BlockHelper(props:propsBlockHelp) { 
    const [pos,setPos] = React.useState<
    {
        x:number,
        y:number
    }>(
        {
            x:props.block.coordinatesX,
            y:props.block.coordinatesY,
        });

    const [size,setSize] = React.useState<
    {
        width:number,
        height:number
    }>(
        {
            width:props.block.width,
            height:props.block.height
        });

    const addRef = (el: HTMLDivElement|null , id:string) => {
        if(el && !props.refs.current.includes(el) && !props.idsSelectedBlocks.includes(id)){
            props.refs.current.push(el);
        }
    }
    const ref = React.useRef<HTMLDivElement>(null);
    const refLeft = React.useRef<HTMLDivElement>(null);
    const refTop = React.useRef<HTMLDivElement>(null);
    const refRight = React.useRef<HTMLDivElement>(null);
    const refBottom = React.useRef<HTMLDivElement>(null);

    useResizer(
    {
        block: props.block, 
        refs: {
            ref: ref,
            refBottom: refBottom,
            refLeft: refLeft,
            refRight: refRight,
            refTop: refTop,
        },
        setSize,
        setPos,
    });
    
    useDragger(
    {
        block: props.block,
        ref: ref,
        setPos,
    });

    return (
        <div id={props.block.id} className={styles.resizeable} style={
            { 
                position: "absolute",
                top:`${pos.y}`+`px`,
                left:`${pos.x}`+`px`,
                width:`${size.width}`+`px`,
                height:`${size.height}`+`px`,
            }
        }>
            <div ref={refLeft} className={styles.resizer_l}></div>
            <div ref={refTop} className={styles.resizer_t}></div>
            <div ref={refRight} className={styles.resizer_r}></div>
            <div ref={refBottom} className={styles.resizer_b}></div>
            <div className={styles.block}  ref={ref}
                onMouseDown={()=>{
                    dispatch(selectBlock, props.block.id);
                }}>
                <SlideBlock block={props.block} idsSelectedBlocks={props.idsSelectedBlocks}/>
            </div>
        </div>
)
}