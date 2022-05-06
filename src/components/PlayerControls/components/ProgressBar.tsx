import React, { forwardRef, RefObject, useRef } from 'react';
import cn from 'classnames';
import styles from '../PlayerControls.module.scss';
import { CurrentHoverTime } from './CurrentHoverTime';
import { IPlayerControlsProps } from '../PlayerControls.types';

interface IProgressBarProps {
    // state vars
    progress: IPlayerControlsProps['progress'];
    progressPercentage: number;
    progressHoverPercentage: number;
    isDragging: boolean;
    isHovering: boolean;

    // hover time callbacks
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseOver: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;

    // progress bar click callbacks
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;

    // on progerss head drag callbacks
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const ProgressBar = forwardRef<HTMLDivElement, IProgressBarProps>((props, ref) => {
    // props
    const {
        progress,
        progressPercentage,
        progressHoverPercentage,
        isDragging,
        isHovering,

        onClick,
        onDrag,
        onDragEnd,
        onDragStart,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onMouseOver,
    } = props;

    // refs
    const localProgressTrackRef = useRef<HTMLDivElement>(null);
    const requiredRef = (ref || localProgressTrackRef) as RefObject<HTMLDivElement>;

    // compute
    const currentProgressHoverPercentage = isDragging
        ? progressPercentage
        : progressHoverPercentage;

    return (
        <div
            className={cn(styles.progressWrapper)}
            onMouseMove={onMouseMove}
            onMouseOver={onMouseOver}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
        >
            <div className={cn(styles.progress, styles.progressPadding)} />
            <div className={cn(styles.progress, styles.progressTrack)} ref={requiredRef} />
            <div
                className={cn(styles.progress, styles.progressBar)}
                style={{ width: `${progressPercentage}%` }}
            />
            <div className={cn(styles.progress, styles.progressBuffer)} />
            <div
                className={cn(styles.progress, styles.progressHover)}
                style={{
                    width: `${progressHoverPercentage}%`,
                }}
            />
            <div
                draggable
                className={cn(styles.progress, styles.progressHead)}
                style={{
                    left: `${progressPercentage}%`,
                }}
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
            />
            <CurrentHoverTime
                progress={progress}
                isDragging={isDragging}
                isHovering={isHovering}
                progressTrackWidth={requiredRef.current?.clientWidth ?? 0}
                currentProgressHoverPercentage={currentProgressHoverPercentage}
            />
        </div>
    );
});
