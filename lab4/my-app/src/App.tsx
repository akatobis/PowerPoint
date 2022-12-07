import React from 'react';
import './App.css';
import styles from "./components/Slide/Slide.module.css"
import {Slide} from './components/Slide/Slide'
import {ToolsPanal} from './components/ToolsPanal/ToolsPanal';
import {PresentationMaker, SlideType} from './types';
import {Navigation} from "./components/Navigation/Navigation";

type AppProps = {
    presentationMaker: PresentationMaker,
}

function App(props: AppProps) {
    const slides: SlideType[] = props.presentationMaker.presentation.slides

    const idsSelectedSlides = props.presentationMaker.idsSelectedSlides;
    const idCurrSlide: string = idsSelectedSlides[0]

    return (
        <div className="app">
            <Navigation presentationMaker={props.presentationMaker}/>
            <ToolsPanal/>
            <div className={styles.workZone}>
                {slides.map(slide => {
                    if (slide.id === idCurrSlide) {
                        return <Slide
                            key={slide.id}
                            slide={slide}
                            idsSelectedSlides={props.presentationMaker.idsSelectedSlides}
                            idsSelectedBlocks={props.presentationMaker.idsSelectedBlocks}
                        />
                    }
                })}
            </div>
        </div>
    );
}

export default App;
