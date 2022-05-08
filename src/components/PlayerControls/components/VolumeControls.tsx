import React, { DragEvent, MouseEvent, useCallback, useMemo, useRef } from 'react';
import cn from 'classnames';
import { Icon } from '@iconify/react';
import styles from '../PlayerControls.module.scss';
import { IPlayerControlsProps } from '../PlayerControls.types';
import { PlayerControlsService } from '../PlayerControls.service';
import { useEventListener } from '../../../utilities/cutomHooks';

interface IVolumeControlProps {
    volume: IPlayerControlsProps['volume'];
}
export const VolumeControls = (props: IVolumeControlProps) => {
    // props
    const {
        volume: { isDisabled, isMuted, currentLevel, onChange, onMute, onUnMute },
    } = props;

    // refs
    const volumeTrackRef = useRef<HTMLDivElement>(null);

    // handlers
    // volume head handlers
    const setEmptyDragElement = (e: DragEvent<HTMLDivElement>) => {
        const emptyElement = document.createElement('img');
        e.dataTransfer.setDragImage(emptyElement, 0, 0); // remove drag image
    };
    const onVolumeHeadDragStart = (e: DragEvent<HTMLDivElement>) => {
        setEmptyDragElement(e);
    };
    const onVolumeHeadDrag = (e: DragEvent<HTMLDivElement>) => {
        setEmptyDragElement(e);
        const dragPercentage = PlayerControlsService.getProgressHeadDragPercentage(
            e,
            volumeTrackRef.current as HTMLDivElement,
        );
        onChange?.(dragPercentage); // call callback from props to notify parent
    };
    const onVolumeHeadDragEnd = (e: MouseEvent<HTMLDivElement>) => {
        const dragPercentage = PlayerControlsService.getProgressHeadDragPercentage(
            e,
            volumeTrackRef.current as HTMLDivElement,
        );
        onChange?.(dragPercentage); // call callback from props to notify parent
    };

    const onVolumeIconClick = useCallback(() => {
        if (!isMuted) {
            onMute();
        } else {
            onUnMute();
        }
    }, [onUnMute, onMute, isMuted]);

    const getUpdatedVolumeLevel = (type: 'up' | 'down') => {
        let updatedValue = currentLevel;
        if (type === 'up') {
            updatedValue = updatedValue + 10;
            updatedValue = updatedValue > 100 ? 100 : updatedValue;
        } else {
            updatedValue = updatedValue - 10;
            updatedValue = updatedValue < 0 ? 0 : updatedValue;
        }
        return updatedValue;
    };

    const onKeyDown = (e: WindowEventMap['keydown']) => {
        // if ArrowUp key is pressed and volume is not muted then increase volume by 10%
        // and call callback from props to notify parent to update volume
        // if m key is pressed then mute volume
        if (e.key === 'ArrowUp') {
            onChange?.(getUpdatedVolumeLevel('up'));
        } else if (e.key === 'ArrowDown') {
            onChange?.(getUpdatedVolumeLevel('down'));
        } else if (e.key === 'm') {
            onVolumeIconClick();
        }
    };

    // hooks
    useEventListener('keydown', onKeyDown);

    // compute
    const volumeIcon = useMemo(
        () => PlayerControlsService.getVolumeIcon(currentLevel),
        [currentLevel],
    );

    // paint
    return (
        <div className={styles.volumeControlsWrapper}>
            <Icon
                icon={volumeIcon}
                className={cn(styles.actionIcon, {
                    [styles.iconDisabled]: isDisabled,
                })}
                onClick={onVolumeIconClick}
            />
            <div
                className={styles.volumeSliderWrapper}
                onClick={onVolumeHeadDragEnd}
                onDragStart={onVolumeHeadDragStart}
                onDrag={onVolumeHeadDrag}
                onDragEnd={onVolumeHeadDragEnd}
            >
                <div className={styles.volumeSliderTrack} ref={volumeTrackRef} />
                <div
                    className={styles.volumeSliderProgress}
                    style={{
                        width: `${currentLevel}%`,
                    }}
                />
                <div
                    draggable
                    className={styles.volumeSliderHead}
                    style={{
                        left: `${currentLevel}%`,
                    }}
                    onDragStart={onVolumeHeadDragStart}
                    onDrag={onVolumeHeadDrag}
                    onDragEnd={onVolumeHeadDragEnd}
                />
                <div className={styles.volumeSliderPadding} />
            </div>
            <div className={styles.volumneControlsPadding} />
        </div>
    );
};
