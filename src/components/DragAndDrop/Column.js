import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Item from './Item';

class Column extends Component {
  render() {
    return (
      <div className="drag-column">
        <input
          type="text"
          className="drag-column__title"
          value={this.props.title}
          onBlur={this.hideInput}
          ref={text => (this.text = text)}
          onChange={e => {
            this.props.changeTitle(this.props.id, e.target.value);
          }}
        />
        <Droppable droppableId={this.props.id}>
          {(provided, snapshot) => (
            <div
              className={`drag-column__list ${!snapshot.isDraggingOver ||
                'drag-column__list--in-drag'}`}
              {...provided.dropableProps}
              ref={provided.innerRef}
            >
              {this.props.items.map((item, index) => {
                return <Item key={item.id} item={item} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Column);
