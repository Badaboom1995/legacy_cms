import React from 'react';
import { connect } from 'react-redux';
import './task-preview.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createLessonFromTask } from 'actions/tasks';
import { getTaskLesson } from 'reducers/tasks';
import { addTaskToTest } from 'actions/checks';
import { updateTaskGeneration } from 'actions/tasks';
import { updateGeneration } from 'actions/general';
import EditableWithInput from 'components/EditableField/EditableWithInput';
import EditableAnswer from 'components/EditableField/EditableAnswer';
import EditableWithSelect from 'components/EditableField/EditableWithSelect';
import IllustrationsList from 'components/IllustrationsList/IllustrationsList';
import IllustrationsButton from 'components/IllustrationsButton/IllustrationsButton';
import {
  addIllustrationsFiles,
  changeIllustrationFile,
  removeIllustrationFile,
} from 'actions/illustrations';
import { getIllustrationsEntities } from 'reducers/illustrations';
import ToggleNotForTeacher from 'components/ToggleNotForTeacher/ToggleNotForTeacher';
import TestLessonButton from 'components/TestLessonButton/TestLessonButton';
import Tasks from 'helpers/Tasks';
import FilesService from 'helpers/Files';
import FilesUtilit from 'utilits/FilesUtilit/FilesUtilit';
import config from 'config';

const api_url = config.api.root;
const base_url = config.api.url;

class TaskPreviewContainer extends React.Component {
  state = {
    showGens: this.props.generationsHidden ? false : true,
  };

  toggleGens = () => {
    this.setState(state => ({
      showGens: state.showGens ? false : true,
    }));
  };
  getLetter = index => {
    const alphabetStartIndex = 97;
    return String.fromCharCode(alphabetStartIndex + index);
  };
  deleteGeneration = (id, index) => {
    if (id) {
      const Request = new Tasks();
      Request.deleteGeneration(id);
    } else {
      this.props.deleteGeneration(index);
    }
  };
  addPicture = async id => {
    let data = new FormData();
    const alphabetStartIndex = 97;
    this.props.imagesAnswers.forEach((item, index) => {
      data.append(
        `check_generation[images][${String.fromCharCode(alphabetStartIndex + index)}]`,
        item,
      );
    });

    axios
      .put(`${base_url}teachers/check_generations/${id}`, data, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          'Uchi-User-Id': '12',
          'Uchi-User-Type': 'Teacher',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        //handle error
      });
  };
  savePicture = e => {
    const image = e.target.files;
    this.setState(() => ({ image }));
  };
  uploadPicture = (index, id) => {
    const image = this.state.image;
    const data = new FormData();
    const alphabetStartIndex = 97;
    data.append(
      `check_generation[images][${String.fromCharCode(alphabetStartIndex + index)}]`,
      image[0],
    );
    console.log(`check_generation[image][${String.fromCharCode(alphabetStartIndex + index)}]`);
    axios
      .put(`${base_url}teachers/check_generations/${id}`, data, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          'Uchi-User-Id': '12',
          'Uchi-User-Type': 'Teacher',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        //handle error
      });
  };

  confirmDelete = taskId => {
    if (window.confirm('Вы действительно хотите удалить задание?')) {
      this.props.deleteTask(taskId);
    }
  };

  confirmDeleteGeneration = (genId, index) => {
    if (window.confirm('Вы действительно хотите удалить генерацию?')) {
      this.deleteGeneration(genId, index);
    }
  };

  buttonCreateLessonHandler = taskId => {
    const { dispatch } = this.props;
    dispatch(createLessonFromTask(taskId));
  };

  addIllustration = async ({ files, generation }) => {
    const { dispatch } = this.props;

    if (files) {
      const { id, generationIndex } = generation;
      if (id !== undefined) {
        const updatedGeneration = await FilesService.uploadIllustrations({
          files,
          generationId: id,
        });
        dispatch(updateTaskGeneration(updatedGeneration));
      } else if (generationIndex !== undefined) {
        await dispatch(addIllustrationsFiles({ generationIndex, files }));
        const { illustrations } = this.props;
        dispatch(
          updateGeneration({
            generationIndex,
            fieldName: 'illustrations',
            payload: illustrations[generationIndex],
          }),
        );
      }
    }
  };

  changeIllustration = async ({ evt, name, generation }) => {
    const { dispatch } = this.props;
    const files = Array.from(evt.target.files);

    if (files) {
      const { id, generationIndex } = generation;
      if (id !== undefined) {
        const updatedGeneration = await FilesService.uploadIllustrations({
          files,
          generationId: id,
        });
        dispatch(updateTaskGeneration(updatedGeneration));
      } else if (generationIndex !== undefined) {
        const file = files[0];
        await dispatch(changeIllustrationFile({ generationIndex, fileName: name, file }));
        const { illustrations } = this.props;
        dispatch(
          updateGeneration({
            generationIndex,
            fieldName: 'illustrations',
            payload: illustrations[generationIndex],
          }),
        );
      }
    }
  };

  removeIllustration = async ({ index, name, generation }) => {
    const { dispatch } = this.props;

    if (index !== undefined) {
      const { id, generationIndex } = generation;
      if (id !== undefined) {
        const indexes = [index];
        await FilesService.removeIllustrations({ indexes, generationId: id });
      } else if (generationIndex !== undefined) {
        await dispatch(removeIllustrationFile({ generationIndex, fileName: name }));
        const { illustrations } = this.props;
        dispatch(
          updateGeneration({
            generationIndex,
            fieldName: 'illustrations',
            payload: illustrations[generationIndex],
          }),
        );
      }
    }
  };

  render() {
    const {
      generationsHidden,
      noDeleteButton,
      noAddButton,
      taskLesson,
      noToggleButton,
    } = this.props;
    const { chapter, difficulty, grade, subject, name, id, not_for_teacher } = this.props.task;
    const showGens = (generationsHidden && this.state.showGens) || !generationsHidden;
    const Request = new Tasks();

    const renderIllustrations = generation => {
      const { illustrations } = generation;
      let result = null;
      if (illustrations && illustrations.length) {
        result = (
          <IllustrationsList
            key={`illustrations-list-${generation.id}`}
            illustrations={illustrations}
            generationId={generation.id}
            onChange={opts => this.changeIllustration({ ...opts, generation })}
            onRemove={opts => this.removeIllustration({ ...opts, generation })}
          />
        );
      } else {
        result = (
          <IllustrationsButton onChange={files => this.addIllustration({ files, generation })} />
        );
      }
      return result;
    };

    return (
      <div key={id} className={`${this.props.className} task-preview `}>
        <div className="task-preview__main">
          <EditableWithInput
            task={this.props.task}
            paramName="name"
            className="task-preview__title"
            handleFunction={Request.updateCheckJob}
          >
            {name || 'Название'}
          </EditableWithInput>
          <div className="task-preview__subtitle">{chapter && chapter.name}</div>
          <EditableWithSelect
            task={this.props.task}
            options={this.props.general.difficulty}
            getNames={array => array.map(item => item.name)}
            getId={(array, value) => array.find(item => item.name == value)}
            paramName="difficulty"
            className="task-preview__param"
          >
            {difficulty || 'Cложность'}
          </EditableWithSelect>
          <EditableWithSelect
            task={this.props.task}
            options={this.props.general.learning_levels}
            getNames={array => array.map(item => item.name)}
            getId={(array, value) => array.find(item => item.name == value)}
            paramName="learning_level_id"
            className="task-preview__param"
          >
            {grade ? `${grade} класс` : 'Класс'}
          </EditableWithSelect>
          <EditableWithSelect
            task={this.props.task}
            options={this.props.general.subjects}
            getNames={array => array.map(item => item.name)}
            getId={(array, value) => array.find(item => item.name == value)}
            paramName="subject"
            className="task-preview__param"
          >
            {(subject && subject.name) || 'Предмет'}
          </EditableWithSelect>
          <div>
            {!noDeleteButton && (
              <button onClick={() => this.confirmDelete(id)}>Удалить задание</button>
            )}
            {generationsHidden && <button onClick={this.toggleGens}>Показать генерации</button>}
            {!noAddButton && (
              <button
                onClick={() => {
                  this.props.dispatch(
                    addTaskToTest({ task: this.props.task, generations: this.props.generations }),
                  );
                }}
              >
                Добавить задание в тест
              </button>
            )}
            {!noToggleButton && <ToggleNotForTeacher targetType="task" target={this.props.task} />}
            <div className="task-preview__test-lesson">
              <TestLessonButton
                lesson={taskLesson}
                className="task-preview__create-lesson-button"
                buttonCreateLessonHandler={() => this.buttonCreateLessonHandler(id)}
              />
            </div>
          </div>
        </div>

        <div>
          {showGens &&
            this.props.generations.map((generation, index) => {
              const answers =
                generation.answers || generation.expressions || generation.inputs || [];
              let images = [];
              if (generation.images && generation.images.length) {
                images = generation.images;
              } else if (this.props.images && this.props.images[index]) {
                images = this.props.images[index];
              }
              return (
                <div className="task-preview__main task-preview__main--generation" key={index}>
                  <EditableWithInput
                    task={generation}
                    paramName="name"
                    className="task-preview__title"
                    handleFunction={Request.updateGeneration}
                  >
                    {generation.text}
                  </EditableWithInput>
                  <span className="task-preview__subtitle">{generation.kind}</span>
                  <div className="task-preview__illustrations">
                    {renderIllustrations(generation)}
                  </div>
                  <ul className="task-preview__generations">
                    {answers.map((answer, index) => {
                      const letter = this.getLetter(index);
                      /* Если пришел массив файлов - берем из массива по индексу,
                      если массив сохраненных картинок в генерации - ищем по букве ответа
                      to do - Надо будет хранить файлы в store в объекте с полями-буквами,
                      которые соответсвуют букве ответа, чтобы было удобно их оттуда доставать */
                      const image = FilesUtilit.isArrayOfFiles(images)
                        ? images[index]
                        : images.find(item => item.answer == letter);
                      const imageSource = FilesUtilit.getImageURL(image);
                      const locallyRightAnswer =
                        generation.answers &&
                        generation.answers[index] &&
                        generation.rightAnswers.includes(generation.answers[index]);
                      const fetchedRightAnswer =
                        generation.answersType && generation.answersType[index];
                      return (
                        <li
                          className={`task-preview__generation-answer
                        ${generation.rightAnswers &&
                          (locallyRightAnswer || fetchedRightAnswer) &&
                          'task-preview__generation-answer--right'}`}
                          key={index}
                        >
                          <label htmlFor="edit-image">
                            <img
                              onClick={this.savePicture}
                              className="task-preview__answer-image"
                              src={imageSource}
                              alt=""
                            />
                          </label>
                          {this.state.image && (
                            <button onClick={() => this.uploadPicture(index, generation.id)}>
                              Submit
                            </button>
                          )}
                          <EditableAnswer
                            task={generation}
                            task_id={id}
                            paramName="data"
                            editableAnswer
                            index={index}
                            handleFunction={Request.updateGeneration}
                          >
                            {generation.rightAnswers ? answer : answer.value}
                          </EditableAnswer>
                        </li>
                      );
                    })}
                  </ul>
                  <button onClick={() => this.confirmDeleteGeneration(generation.id, index)}>
                    delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

TaskPreviewContainer.propTypes = {
  generationsHidden: PropTypes.bool,
  tasks: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { task } = ownProps;
  const taskLesson = getTaskLesson(state, task.id);

  return {
    general: state.general,
    checks: state.checks,
    images: state.images.images,
    illustrations: getIllustrationsEntities(state),
    taskLesson,
  };
};

export default connect(mapStateToProps)(TaskPreviewContainer);
