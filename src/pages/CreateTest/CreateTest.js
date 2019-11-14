import React from 'react';
import { connect } from 'react-redux';
import Checks from 'helpers/Checks';
import Tasks from 'helpers/Tasks';
import TextInput from 'components/TextInput/TextInput';
import TasksList from 'components/TasksList/TasksList';
import Select from 'components/Select/Select';
import Button from 'components/Button/Button';
import { getTasks, getTasksPart } from 'actions/tasks';
import { addTaskToTest, addCheckOption } from 'actions/checks';
import TaskPreview from 'components/TaskPreview/TaskPreview';
import SelectElement from 'components/SelectElement/SelectElement';
import './create-test.scss';

const TASKS_LIMIT = 20;
const defaultParams = {
  sort: `id+desc`,
  limit: TASKS_LIMIT,
  filters: {
    base: 'true',
  }
};

class CreateTest extends React.Component {
  subjects = { Математика: 1, Русский: 2 };
  difficulty = { Базовый: 1, Продвинутый: 2 };
  type = { 'Самостоятельная работа': 1, 'Контрольная работа': 2 };
  grade = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  state = {
    tasks: [],
    choosedTasksIds: [],
    check: {},
    checkJobs: [],
    tasksOffset: 0,
    tasksFetching: false,
    activeSubject: 1,
    filterLearningLevel: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const params = {
      ...defaultParams,
    };
    dispatch(getTasks(params));
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ popupVisible: state.popupVisible ? false : true }));
    }
  };

  componentDidUpdate(prevProps) {
    const { tasks } = this.props;
    if (prevProps.tasks.taskList
      && tasks.taskList
      && prevProps.tasks.taskList.length !== tasks.taskList.length
    ) {
      this.setState({ tasksFetching: false });
    }
  };

  selectSubject = subjectId => {
    const { filterLearningLevel } = this.state;
    const params = {
      ...defaultParams,
      filters: {
        ...defaultParams.filters,
        subject: subjectId,
      },
    };
    if (filterLearningLevel) params.filters.learning_level_id = filterLearningLevel;

    this.props.dispatch(getTasks(params));
    this.setState(() => ({ activeSubject: subjectId, tasksOffset: 0 }));
  };

  onCustomChange = (value, name, list) => {
    const Obj = { name: value, id: list[value] };
    this.onChange(Obj, name);
  };
  getNames = obj => {
    return Object.keys(obj);
  };
  updateCheck = () => {
    const Request = new Checks();
    Request.getChecks(this.check_id).then(res => {
      this.setState(() => ({
        check: res[0],
      }));
    });
  };
  getChapterId = () => {
    const chapter = this.props.general.chapters.filter(item => {
      return item.name === this.props.checks.chapter;
    });
    return chapter[0] && chapter[0].id;
  };
  getTopicId = () => {
    const topic = this.props.general.topics.filter(item => {
      return item.name === this.props.checks.topic;
    });
    return topic[0] && topic[0].id;
  };
  getGradeId = () => {
    const targetGrade = this.props.general.learning_levels.filter(grade => {
      return grade.value == this.props.checks.grade;
    });
    return targetGrade[0].id;
  };

  createCheck = () => {
    const { test_name, subject, grade, difficulty, type, time_limit } = this.props.checks;
    const Request = new Checks();
    Request.createCheck(
      test_name.trim(),
      subject.id,
      this.getGradeId(),
      difficulty,
      type,
      this.getChapterId(),
      this.getTopicId(),
      parseInt(time_limit),
    ).then(res => {
      this.props.dispatch(addCheckOption('id', res.id));
      this.setState(() => ({
        check_id: res.id,
        check: res,
      }));
    });
  };
  onChange = (value, name) => {
    this.props.dispatch(addCheckOption(name, value));
  };
  onFilterChange = (value, name) => {
    const { general } = this.props;
    const chosenLevel = general.learning_levels.find(level => level.value == value);
    const { activeSubject } = this.state;
    const params = {
      ...defaultParams,
      filters: {
        ...defaultParams.filters,
        subject: activeSubject,
      },
    };

    if (chosenLevel) {
      params.filters.learning_level_id = chosenLevel.id;
    }

    this.setState(() => ({
      filterLearningLevel: chosenLevel ? chosenLevel.id : null,
      tasksOffset: 0
    }));

    this.props.dispatch(getTasks(params));
  };
  toggleTask = id => {
    if (this.state.choosedTasksIds.includes(id)) {
      this.setState(state => ({
        choosedTasksIds: state.choosedTasksIds.filter(item => {
          return item != id;
        }),
      }));
    } else {
      this.setState(state => ({
        choosedTasksIds: [...state.choosedTasksIds, id],
      }));
    }
  };
  deleteTask = id => {
    const Request = new Tasks();
    Request.deleteTask(id);
  };

  createCheckJob = () => {
    const { check_id, choosedTasksIds } = this.state;
    const Request = new Checks();
    Request.createCheckJobs(check_id, choosedTasksIds.toString()).then(() => {
      this.updateCheck();
      this.setState(() => ({
        choosedTasksIds: [],
      }));
    });
  };

  buttonRequestHandler = () => {
    const { dispatch } = this.props;
    const { tasksOffset, activeSubject, filterLearningLevel } = this.state;
    const newOffset = tasksOffset + TASKS_LIMIT;

    const params = {
      ...defaultParams,
      offset: newOffset,
      filters: {
        ...defaultParams.filters,
        subject: activeSubject,
      },
    };
    if (filterLearningLevel) params.filters.learning_level_id = filterLearningLevel;

    dispatch(getTasksPart(params));
    this.setState({ tasksOffset: newOffset, tasksFetching: true });
  };

  render() {
    const { tasks, isAllTasksReceived } = this.props;
    const { tasksFetching } = this.state;
    return (
      <div className="content">
        <div className="content__main content__main--create-test">
          <p className="content__title">Конструктор теста</p>
          <div className="filters-wrapper" >
            <Select
              name="grade-filter"
              modificators="select--in-row"
              options={["Все", ...this.props.learning_levels]}
              onChange={this.onFilterChange}
              value="Фильтр по классу"
            />
          </div>
          <TasksList tasks={tasks.taskList} onSelect={this.selectSubject} />
          {(tasks.taskList.length === 0) && "Ничего не найдено"}
          {isAllTasksReceived
            ? null
            : (
              <Button className={`tests-button__request ${tasks.taskList.length ? '' : 'hidden'}`} onClick={this.buttonRequestHandler}>
              {tasksFetching
                ? `Загрузка...`
                : `Показать ещё ${TASKS_LIMIT}`
              }
              </Button>
            )
          }
        </div>
        <div className="content__secondary">
          <TextInput
            name="test_name"
            placeholder="Контрольная для седьмого класса"
            onChange={this.onChange}
            label="Название теста"
          />
          <TextInput
            name="time_limit"
            placeholder="Время в минутах"
            onChange={this.onChange}
            label="Время на тест"
          />
          <Select
            name="grade"
            modificators="select--in-row"
            options={this.props.learning_levels}
            onChange={this.onChange}
            label="Класс"
          />
          <Select
            name="subject"
            modificators="select--in-row"
            options={this.getNames(this.subjects)}
            onChange={(value, name) => {
              this.onCustomChange(value, name, this.subjects);
            }}
            label="Предмет"
          />
          <Select
            name="difficulty"
            modificators="select--in-row"
            options={this.getNames(this.difficulty)}
            onChange={(value, name) => {
              this.onCustomChange(value, name, this.difficulty);
            }}
            label="Сложность"
          />
          <Select
            name="type"
            modificators="select--in-row"
            options={this.getNames(this.type)}
            onChange={(value, name) => {
              this.onCustomChange(value, name, this.type);
            }}
            label="Тип"
          />
          <SelectElement
            reduxStore="checks"
            type="topic"
            name="Раздел"
            elements={this.props.general.topicsNames}
            chooseElement={(name, value) => {
              this.props.dispatch(addCheckOption(name, value));
            }}
          />
          <SelectElement
            reduxStore="checks"
            type="chapter"
            name="Тема"
            elements={this.props.general.chaptersNames}
            chooseElement={(name, value) => {
              this.props.dispatch(addCheckOption(name, value));
            }}
          />
          <button onClick={this.createCheck} className="button button--select-element">
            Создать тест
          </button>
          {this.state.check.name && <h3 className="create-test__title">{this.state.check.name}</h3>}
          <div className="create-test create-test--preview">
            {this.props.checks.tasks.map((item, index) => {
              return (
                <TaskPreview
                  noAddButton
                  noDeleteButton
                  key={index}
                  task={item.task}
                  generations={item.generations}
                  generationsHidden
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  tasks: state.tasks,
  checks: state.checks,
  learning_levels: state.general.learning_levels.map(item => item.value),
  isAllTasksReceived: state.tasks.isAllReceived,
});

export default connect(mapStateToProps)(CreateTest);
