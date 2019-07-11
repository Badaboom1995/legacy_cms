import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Answers from 'components/Answers/Answers';
import AddAnswer from 'components/AddAnswer/AddAnswer';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';
import Button from '@material-ui/core/Button';

class AddTaskInfo extends React.Component {
  mechanicOptions = [
    {
      name: 'Ввод ответа',
      component: <Answers />,
    },
    {
      name: 'Выбор одного ответа',
      component: <Answers />,
    },
    {
      name: 'Выбор множества ответа',
      component: <Answers multipleChoise />,
    },
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

  getActiveMechanic = () => {
    const { kind } = this.props;
    const { mechanicOptions } = this;
    if (kind === 'Перетаскивание') {
      return (
        <React.Fragment>
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
      <div className="content__fragment">
        <TextInput name="text" onChange={this.props.onChange} label="Текст задания" />
        <Select
          name="kind"
          modificators="select--in-row"
          options={this.getOptions()}
          onChange={this.props.onChange}
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
    );
  }
}

export default connect()(AddTaskInfo);
