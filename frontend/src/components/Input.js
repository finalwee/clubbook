import React, {useEffect, useState} from "react";

function Row(props){

    return(
        <div className="each-row_align">
            <input placeholder={props.row_index} style={props.row_style} size="1" disabled/>
            {props.col_index.map(value=> <Cell row_index={props.row_index} col_index={value}/>)}
        </div>
    );
}

function Cell(props){

    return (
    <input id={props.row_index+"/"+props.col_index}></input>
    ); 
}

function ColumnIndex(props){

    return(
        <div className="each-row_align">
            <input size="1" disabled/>
            {props.col_index.map((value, index) => <input placeholder={value} style={props.col_style[index]} disabled/>)}
        </div>
    );
}


export default Row;

export {ColumnIndex};

