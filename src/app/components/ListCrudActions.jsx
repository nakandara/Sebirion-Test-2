import React from 'react';
import { Button, useTheme, Box, ButtonGroup } from '@mui/material';
import { AddBoxOutlined, DeleteOutlineOutlined, ModeEditOutline, SaveOutlined } from '@mui/icons-material';
import { tokens } from '../../theme';

export default function ListCrudActions({ addItems, handleSave, handleEdit, handleDelete }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const buttonStyle = { maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px' }
    return (
        <Box mb="2px" sx={{ color: colors.grey[100] }}>
            <ButtonGroup sx={{ color: colors.grey[100] }}>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={addItems}>
                    <AddBoxOutlined />
                </Button>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={handleEdit}>
                    <ModeEditOutline />
                </Button>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={handleSave}>
                    <SaveOutlined />
                </Button>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={handleDelete}>
                    <DeleteOutlineOutlined />
                </Button>
            </ButtonGroup>
        </Box>
    )
}
