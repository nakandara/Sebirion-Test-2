import React from 'react'
import './crudActions.css'
import { Button, Stack } from '@mui/material';
import { AddOutlined, DeleteOutline, ModeEditOutline, SaveOutlined } from '@mui/icons-material';

export default function CrudActions({ handleNew, isNewEnabled, handleEdit, isEditEnabled, handleSave, isSaveEnabled, handleDelete, isDeleteEnabled }) {
    const buttonStyle = { maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px' }
    return (
        <Stack spacing={1} direction="row">
            <Button style={buttonStyle} variant="outlined" size="small" onClick={handleNew} disabled={!isNewEnabled}>
                <AddOutlined />
            </Button>
            <Button style={buttonStyle} variant="outlined" size="small" onClick={handleEdit} disabled={!isEditEnabled}>
                <ModeEditOutline />
            </Button>
            <Button style={buttonStyle} variant="outlined" size="small" onClick={handleSave} disabled={!isSaveEnabled}>
                <SaveOutlined />
            </Button>
            <Button style={buttonStyle} variant="outlined" size="small" onClick={handleDelete} disabled={!isDeleteEnabled}>
                <DeleteOutline />
            </Button>
        </Stack>

    )
}
