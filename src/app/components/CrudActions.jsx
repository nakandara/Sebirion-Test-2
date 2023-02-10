import { AddBoxOutlined, DeleteOutlineOutlined, ModeEditOutline, SaveOutlined } from '@mui/icons-material'
import { Box, Button, ButtonGroup, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';

function CrudActions({ handleNew, isNewEnabled, handleEdit, isEditEnabled, handleSave, isSaveEnabled, handleDelete, isDeleteEnabled }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const buttonStyle = { maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px' }
    return (
        <Box mb="10px" sx={{color: colors.grey[100]}}>
            <ButtonGroup>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={handleNew}
                    disabled={!isNewEnabled}>                    
                    <AddBoxOutlined />
                </Button>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={handleEdit}
                    disabled={!isEditEnabled}>
                    <ModeEditOutline />
                </Button>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={handleSave}
                    disabled={!isSaveEnabled}>
                    <SaveOutlined />
                </Button>
                <Button
                    sx={{ color: colors.grey[100] }}
                    style={buttonStyle}
                    variant="outlined"
                    size="small"
                    onClick={handleDelete}
                    disabled={!isDeleteEnabled}>
                    <DeleteOutlineOutlined />
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default CrudActions