import React from 'react';
import { Stack, Button } from '@mui/material';
import { AddOutlined, DeleteOutline, ModeEditOutline, SaveOutlined } from '@mui/icons-material';

export default function ListCrudActions({ addItems, handleSave, handleEdit, handleDelete }) {
    const buttonStyle = { maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px' }
    return (
        <Stack spacing={1} direction="row">
            <Button style={buttonStyle} variant="outlined" size="small" onClick={() => addItems(undefined)}>
                <AddOutlined />
            </Button>
            <Button style={buttonStyle} variant="outlined" size="small" onClick={handleSave}>
                <SaveOutlined />
            </Button>
            <Button style={buttonStyle} variant="outlined" size="small" onClick={handleEdit}>
                <ModeEditOutline />
            </Button>
            <Button style={buttonStyle} variant="outlined" size="small" onClick={handleDelete}>
                <DeleteOutline />
            </Button>
        </Stack>
    )
}
