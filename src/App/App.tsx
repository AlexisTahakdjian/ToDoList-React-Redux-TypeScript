import React, {useRef, useState} from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {connect} from "react-redux";
import {deleteTodo, markComplete, markIncomplete} from 'action/index';
import storeType from "../types/storeType";
import AppPropType from "./AppPropType";

const App: React.FC<AppPropType> = ({complete, incomplete, deleteTodo, markComplete, markIncomplete,}) => {

    const [value, setValue] = React.useState('')

    const input = useRef<HTMLInputElement>(null);

    const renderList = (type: "Complete" | "Incomplete") => {
        const looper = type === "Complete" ? complete : incomplete;

        return (
            <Grid item xs={8}>
                <h1>{type}</h1>
                <List>
                    {looper.map((todo: string, index: number) => {
                        console.log('todo', todo)
                        return (
                            <ListItem
                                key={index}
                                sx={type === 'Complete' ? {bgcolor: 'success.main'} : {bgcolor: 'error.main'}}
                                secondaryAction={
                                    <>
                                        {type === 'Complete' ?
                                            <IconButton edge="end"
                                                        aria-label="down"
                                                        onClick={() => markIncomplete(todo)}
                                            >
                                                <ArrowDownwardIcon/>
                                            </IconButton>
                                            :
                                            <IconButton edge="end"
                                                        aria-label="up"
                                                        onClick={() => markComplete(todo)}
                                            >
                                                <ArrowUpwardIcon/>
                                            </IconButton>
                                        }

                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemText primary={todo}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        );
    }

    const addTodo = () => {
        if (value) {
            console.log("value", value)
            markIncomplete(value)
        }
    }

    return (
        <div>
            <Grid container spacing={2} columns={1}>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Entrer une tâche" variant="outlined" value={value} onChange={event => setValue(event.target.value)}/>
                    <Button variant="contained" onClick={() => addTodo()}>Ajouter</Button>
                </Grid>
                {renderList("Complete")}
                {renderList("Incomplete")}
            </Grid>
        </div>
    )
}

const mapStateToProos = (state: storeType) => {
    return {
        complete: state.complete,
        incomplete: state.incomplete,

    }
}

export default connect(mapStateToProos, {deleteTodo, markComplete, markIncomplete})(App);
