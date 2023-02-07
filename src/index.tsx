import React, { ComponentType, ReactElement } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import addVideo from './modifiers/addVideo';
import VideoComponent, { VideoProps } from './Video';
import {ATOMIC, VIDEOTYPE} from './types/constant';

export interface VideoPluginTheme {
    video?: string;
}

const defaultTheme: VideoPluginTheme = {};

export interface VideoPluginConfig {
    decorator?: (component: ComponentType<VideoProps>) => ComponentType<VideoProps>;
    theme?: VideoPluginTheme;
    videoComponent?: ComponentType<VideoProps>;
}

export type VideoEditorPlugin = EditorPlugin & {
    addVideo: typeof addVideo;
};

export default (config: VideoPluginConfig = {}): VideoEditorPlugin => {
    const initialTheme = config.theme ?? defaultTheme;
    let Video = config.videoComponent ?? VideoComponent as ComponentType<VideoProps>;
    if (config.decorator) {
        Video = config.decorator(Video);
    }
    const ThemedVideo = (props: VideoProps): ReactElement => <Video {...props} theme={initialTheme} />

    return {
        blockRendererFn: (block, { getEditorState }) => {
            if (block.getType() === ATOMIC) {
                const contentState = getEditorState().getCurrentContent();
                const entityKey = block.getEntityAt(0);
                if (!entityKey) return null;
                const entity = contentState.getEntity(entityKey);
                const type = entity.getType();
                const { data, extraData } = entity.getData();
                if (type === VIDEOTYPE) {
                    return {
                        component: ThemedVideo,
                        editable: false,
                        props: {
                            data,
                            extraData,
                        }
                    };
                }
                return null;
            }

            return null;
        },
        addVideo,
    };
};

export const Video = VideoComponent;
