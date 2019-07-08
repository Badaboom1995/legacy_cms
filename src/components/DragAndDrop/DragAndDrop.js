import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import uuid from 'uuid';
import './drag-and-drop.scss';
import Column from './Column';
import AddAnswer from 'components/AddAnswer/AddAnswer';
import { addColumn, changeAnswerIndex } from 'actions/general';

class DragAndDrop extends Component {
  state = {
    answers: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Делится на 3',
        answerIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'Делится на 5',
        answerIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Делится на 28',
        answerIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // За пределами колонок
    if (!destination) {
      return;
    }
    // Положили туда где взяли
    if (destination.droppableId == source.droppableId && destination.index == source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

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
      ...this.state,
      columns: {
        ...this.state.columns,
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
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  };
  addColumn = column => {
    const id = uuid();
    const newColumn = {
      id,
      title: 'New column',
      answerIds: [],
    };
    console.log(newColumn);
    this.setState(
      state => ({
        columns: { ...this.state.columns, [id]: newColumn },
        columnOrder: [...this.state.columnOrder, id],
      }),
      () => {
        console.log(this.state);
      },
    );
  };
  addAnswer = content => {
    const id = uuid();
    const newAnswer = { id, content };
    const firstColumnKey = Object.keys(this.state.columns)[0];

    console.log({
      answers: {
        ...this.state.answers,
        [id]: newAnswer,
      },
      columns: {
        ...this.state.columns,
        [firstColumnKey]: {
          ...this.state.columns,
          answerIds: [...this.state.columns[firstColumnKey].answerIds, id],
        },
      },
    });
    this.setState(() => ({
      answers: {
        ...this.state.answers,
        [id]: newAnswer,
      },
      columns: {
        ...this.state.columns,
        [firstColumnKey]: {
          ...this.state.columns[firstColumnKey],
          answerIds: [...this.state.columns[firstColumnKey].answerIds, id],
        },
      },
    }));
    changeTitle = (id, title) => {
      this.setState(() => ({
        columns: {
          [id]: {
            ...this.state.columns[id],
            title,
          },
        },
      }));
    };
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <AddAnswer addAnswer={this.addAnswer}></AddAnswer>
        <div className="drag-container">
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const items = column.answerIds.map(answerId => this.state.answers[answerId]);

            return (
              <Column
                changeTitle={this.changeTitle}
                key={column.id}
                id={column.id}
                title={column.title}
                items={items}
              ></Column>
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

const syncAnswers = (answers, columns, state) => {
  // const adoptedAnswers = columns.reduce((accum, item) => {}, {});
  console.log(state);
  const newAnswers = answers.reduce((accum, item) => {
    const answerId = uuid();
    const content = item;
    const newAnswer = { id: answerId, content };

    return { ...accum, [answerId]: newAnswer };
  }, {});

  // const newColumns = columns.reduce((accum, item) => {
  //   const columnId = item.id;
  //   const content = item;
  //   const newAnswerIds = Object.keys(newAnswers);
  //   content.answerIds = newAnswerIds;

  //   return { ...accum, [columnId]: content };
  // }, {});

  // const oldColumnIds = columns.map(column => column.id);

  // console.log({
  //   answers: newAnswers,
  //   columns: {
  //     ...newColumns,
  //   },
  //   columnOrder: [...oldColumnIds],
  // });

  return newAnswers;
};

const mapStateToProps = state => ({
  general: syncAnswers(state.general.answers, state.general.columns, state),
});

export default connect(mapStateToProps)(DragAndDrop);
