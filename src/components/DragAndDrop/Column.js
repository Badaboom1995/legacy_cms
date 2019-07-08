import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Item from './Item';

class Column extends Component {
  state = {
    titleChanging: false,
  };
  showInput = () => {
    this.setState(() => ({
      titleChanging: true,
    }));
  };
  hideInput = e => {
    this.setState(() => ({
      titleChanging: false,
    }));
    this.props.changeTitle(this.props.id, e.target.value);
  };
  render() {
    return (
      <div className="drag-column">
        {this.state.titleChanging ? (
          <input type="text" value={this.props.title} onChange={this.hideInput} />
        ) : (
          <h3 className="drag-column__title" onClick={this.showInput}>
            {this.props.title}
          </h3>
        )}
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
