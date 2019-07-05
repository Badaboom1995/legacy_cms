import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import uuid from 'uuid';
import './drag-and-drop.scss';
import Column from './Column';
import { addColumn } from 'actions/general';

class DragAndDrop extends Component {
  onDragEnd = result => {
    console.log(this.props.general);
    const { destination, source, draggableId } = result;

    // За пределами колонок
    if (!destination) {
      return;
    }
    // Положили туда где взяли
    if (destination.droppableId == source.droppableId && destination.index == source.index) {
      return;
    }

    const start = this.props.general.columns[source.droppableId];
    const finish = this.props.general.columns[destination.droppableId];

    if (start === finish) {
      this.changeAnswerIndex(start, source, destination, draggableId);
      return;
    }
    this.changeAnswerColumn(start, finish, source, destination, draggableId);
  };

  changeAnswerIndex = (start, source, destination, draggableId) => {
    const newAnswerIds = Array.from(start.answerIds);

    newAnswerIds.splice(source.index, 1);
    newAnswerIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      answerIds: newAnswerIds,
    };

    const newState = {
      ...this.props.general,
      columns: {
        ...this.props.general.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  changeAnswerColumn = (start, finish, source, destination, draggableId) => {
    const startanswerIds = Array.from(start.answerIds);
    startanswerIds.splice(source.index, 1);
    const newStart = {
      ...start,
      answerIds: [...startanswerIds],
    };

    const finishanswerIds = Array.from(finish.answerIds);
    finishanswerIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      answerIds: [...finishanswerIds],
    };

    const newState = {
      ...this.props.general,
      columns: {
        ...this.props.general.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  };
  addColumn = column => {
    this.props.dispatch(
      addColumn({
        id: uuid(),
        ...column,
      }),
    );
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="drag-container">
          {this.props.general.columnOrder.map(columnId => {
            const column = this.props.general.columns[columnId];
            const items = column.answerIds.map(answerId => this.props.general.answers[answerId]);

            return (
              <Column key={column.id} id={column.id} title={column.title} items={items}></Column>
            );
          })}
        </div>
        <button
          onClick={() => {
            this.addColumn({ title: 'test', answerIds: [] });
          }}
        >
          Add column
        </button>
      </DragDropContext>
    );
  }
}

const syncAnswers = (answers, columns) => {
  const newAnswers = answers.reduce((accum, item) => {
    const answerId = uuid();
    const content = item;
    const newAnswer = { id: answerId, content };

    return { ...accum, [answerId]: newAnswer };
  }, {});

  const newColumns = columns.reduce((accum, item) => {
    const columnId = item.id;
    const content = item;

    return { ...accum, [columnId]: content };
  }, {});

  const newAnswersIds = Object.keys(newAnswers);

  const newColumn = {
    id: uuid(),
    title: 'initial',
    answerIds: newAnswersIds,
  };
  const oldColumnIds = columns.map(column => column.id);
  // console.log({
  //   answers: newAnswers,
  //   columns: {
  //     ...newColumns,
  //     [newColumn.id]: newColumn,
  //   },
  //   columnOrder: [newColumn.id, ...oldColumnIds],
  // });
  return {
    answers: newAnswers,
    columns: {
      ...newColumns,
      [newColumn.id]: newColumn,
    },
    columnOrder: [newColumn.id, ...oldColumnIds],
  };
};

const mapStateToProps = state => ({
  general: syncAnswers(state.general.answers, state.general.columns),
});

export default connect(mapStateToProps)(DragAndDrop);
