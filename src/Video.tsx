import React, { ReactElement } from 'react';
import { ContentState } from 'draft-js';
import clsx from 'clsx';
import styles from "./Video.module.scss";
import {VideoPluginTheme} from './';
import {AddVideoProps} from "./types/constant";

export interface VideoProps extends React.ComponentPropsWithRef<'video'> {
    blockProps: { data: AddVideoProps, extraData: Record<string, unknown> };
    className?: string;
    theme?: VideoPluginTheme;

    //removed props
    blockStyleFn: unknown;
    block: unknown;
    contentState: ContentState;
    customStyleMap: unknown;
    customStyleFn: unknown;
    decorator: unknown;
    forceSelection: unknown;
    offsetKey: unknown;
    selection: unknown;
    tree: unknown;
    preventScroll: unknown;
}

export default React.forwardRef<HTMLVideoElement, VideoProps>(
    function Video(props, ref): ReactElement {
        const {
            contentState,
            blockStyleFn,
            customStyleMap,
            customStyleFn,
            forceSelection,
            offsetKey,
            preventScroll,
            block, className, theme = {}, blockProps, ...elementProps
        } = props;
        const combinedClassName = clsx(styles.videoAttachment, theme.video, className);
        const {data} = blockProps;
        return (
            <video
                ref={ref}
                src={data.src}
                className={combinedClassName}
                controls={true}
                {...elementProps}
            />
        );
    }
);
