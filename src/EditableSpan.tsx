import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpan = {
    title: string
    setNewTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpan) => {

    const [editMode, setEditMode] = useState(false)
    const [inputValu, setInputValu]=useState('')


    function onDoubleClickHandler() {
        setEditMode(true)
        setInputValu(props.title)
    }

    function onBlureHandker() {
        setEditMode(false)
        props.setNewTitle(inputValu)
    }

    return (
        <>
            {
                editMode
                    ?<TextField
                        multiline
                        maxRows={4}
                        autoFocus
                        size={"small"}
                        value={inputValu}
                        onChange={e=>setInputValu(e.currentTarget.value)}
                        onBlur={onBlureHandker}
                    />
                    : <span onDoubleClick={onDoubleClickHandler}>
                        {props.title}
                    </span>
            }

        </>
    );
};

