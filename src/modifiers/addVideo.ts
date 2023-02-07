import {EditorState, AtomicBlockUtils, RichUtils} from 'draft-js';
import {ATOMIC, VIDEOTYPE, AddVideoProps} from '../types/constant';

export default (
    editorState: EditorState,
    data: AddVideoProps,
    extraData: Record<string, unknown>
): EditorState => {
    if (RichUtils.getCurrentBlockType(editorState) === ATOMIC) {
        return editorState;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        VIDEOTYPE,
        'IMMUTABLE',
        { extraData, data }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    return  AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    );
};
