import styles from "./NavSlide.module.css";
import {SlideType} from "../../../types";
import { elemInArray } from "../../../auxiliaryFunctions";
import {useState} from 'react'
import {moveSlides, selectSlides} from './../../../actions/navigation/navigation'
import {dispatch} from "../../../state";
import internal from "stream";

type NavigationSlideProps = {
    slide: SlideType;
    idsSelectedSlides: string[],
    countSlide: number,
}

const NavSlide = (props: NavigationSlideProps) => {
    let navSlideStyle = {
        border: '2px solid #888',
    }
    let parentNavSlideStyle = {
        backgroundColor:'#fff',
        border:'none',
        color:'#fff',
    }
    let buttonNavSlideStyle = {
        backgroundColor:'#fff',
        color:'#fff',
        border:'none',
    }
    if ( elemInArray(props.idsSelectedSlides, props.slide.id)) {
        navSlideStyle = {
            border: '2px solid #6600BA',
        }
        parentNavSlideStyle = {
            backgroundColor:'#FFF6FD',
            border:'none',
            color:'#fff',
        }
        buttonNavSlideStyle = {
            backgroundColor:'#FFF6FD',
            color:'#FFF6FD',
            border:'none',
        }
    }

    const [ dragOver, setDragOver ] = useState(false); 

    const handleDragOverStart = () => setDragOver(true);
    
    const handleDragOverEnd = () => setDragOver(false);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        console.log('drag',event.currentTarget.id)
    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => { 
        event.preventDefault();
    }
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>,slide:SlideType) => {
        event.preventDefault();
        console.log('drop',slide.id)
        dispatch(moveSlides,slide.id)
        setDragOver(false);
    }
    
    return(
        <div className={styles.numberSlide} style={parentNavSlideStyle} id={props.slide.id}>
            <button
                className={styles.slideButton}
                style={buttonNavSlideStyle}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {dispatch(selectSlides, props.slide.id)}}
            >
                <li>
                    <div className={styles.navSlide}
                        draggable={true}
                        onDragStart={(e: React.DragEvent<HTMLDivElement>)=>{handleDragStart(e)}}
                        onDragLeave={(e: React.DragEvent<HTMLDivElement>)=>{handleDragOverEnd()}}
                        onDragEnter={(e: React.DragEvent<HTMLDivElement>)=>handleDragOverStart()}
                        onDragEnd={(e: React.DragEvent<HTMLDivElement>)=>{}}
                        onDragOver={(e: React.DragEvent<HTMLDivElement>)=>{enableDropping(e)}}
                        onDrop={(e: React.DragEvent<HTMLDivElement>)=>{handleDrop(e,props.slide)}}
                        style={ dragOver ? {fontWeight: 'bold', boxShadow: '5px 5px rgb(162, 40, 243)'} : navSlideStyle}
                    >
                    </div>
                </li>
            </button>
        </div>
    );
}

export {
    NavSlide,
}