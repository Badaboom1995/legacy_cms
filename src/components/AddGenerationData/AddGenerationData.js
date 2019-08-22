import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Answers from 'components/Answers/Answers';
import AddAnswer from 'components/AddAnswer/AddAnswer';
import ExpressionsList from 'components/ExpressionsList/ExpressionsList';
import AddExpression from 'components/AddExpression/AddExpression';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';
import TaskPreview from 'components/TaskPreview/TaskPreview';
import Button from '@material-ui/core/Button';
import { clearState, changeOption, saveGeneration } from 'actions/general';

class AddTaskInfo extends React.Component {
  mechanicOptions = [
    {
      name: 'variant',
      component: <Answers />,
    },
    {
      name: 'variants',
      component: <Answers multipleChoise />,
    },
    {
      name: 'variants_all',
      component: <Answers multipleChoise />,
    },
    {
      name: 'inputs',
      component: <ExpressionsList />,
    },
    // {
    //   name: 'dropdown',
    //   component: <ExpressionsList />,
    // },
    {
      name: 'Перетаскивание',
      component: <DragAndDrop />,
    },
    {
      name: 'Графики',
      component: <Answers multipleChoise />,
    },
  ];

  getOptions = () => {
    const { mechanicOptions } = this;
    return mechanicOptions.map(item => item.name);
  };
  onChange = (value, name) => {
    this.props.dispatch(changeOption(name, value));
    if (name == 'kind') {
      this.props.onChange(value, name);
    }
  };
  saveGeneration = () => {
    const { answers, kind, rightAnswers, text, expressions } = this.props.general;
    let generation = { kind, text };
    console.log(text);
    if (['variant', 'variants', 'variants_all'].some(name => name === kind)) {
      generation = { ...generation, answers, rightAnswers };
    } else if (kind === 'inputs' || kind === 'dropdown') {
      generation = { ...generation, expressions };
    }

    this.props.dispatch(saveGeneration(generation));
    this.props.dispatch(clearState());
  };

  getActiveMechanic = () => {
    const { kind } = this.props;
    const { mechanicOptions } = this;
    if (kind === 'Перетаскивание') {
      return (
        <React.Fragment>
          {mechanicOptions.filter(item => item.name === kind)[0].component}
        </React.Fragment>
      );
    } else if (kind === 'inputs' || kind === 'dropdown') {
      return (
        <React.Fragment>
          <AddExpression kind={kind}/>
          {mechanicOptions.filter(item => item.name === kind)[0].component}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <AddAnswer />
        {mechanicOptions.filter(item => item.name === kind)[0].component}
      </React.Fragment>
    );
  };

  render() {
    const { kind } = this.props;
    const mechanicInterface = kind && this.getActiveMechanic();
    return (
      <div className="content__wrap">
        <div className="content__fragment">
          <TextInput name="text" onChange={this.onChange} label="Текст задания" />
          <Select
            name="kind"
            modificators="select--in-row"
            options={this.getOptions()}
            onChange={this.onChange}
            label="Механика"
          />
          {mechanicInterface}
          <Button
            variant="contained"
            color="primary"
            classes={{ root: 'button button--primary' }}
            onClick={this.saveGeneration}
          >
            Добавить генерацию
          </Button>
        </div>
        <TaskPreview
          task={this.props.tasks}
          generations={this.props.general.generations}
          className="content__secondary"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  tasks: state.tasks,
});

export default connect(mapStateToProps)(AddTaskInfo);
