import React from 'react';
import { connect } from 'react-redux';
import './task-preview.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addTaskToTest } from 'actions/checks';
import EditableWithInput from 'components/EditableField/EditableWithInput';
import EditableAnswer from 'components/EditableField/EditableAnswer';
import EditableWithSelect from 'components/EditableField/EditableWithSelect';
import Tasks from 'helpers/Tasks';
import config from 'config';

const api_url = config.api.root;
const base_url = config.api.url;

class TaskPreviewContainer extends React.Component {
  state = {
    showGens: this.props.generationsHidden ? false : true,
  };

  isArrayOfFiles = (arr = []) => {
    return arr.every(it => it instanceof File);
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
  getImageUrl = (image = {}) => {
    let path = '';

    // const image = images.find(item => item.answer == letter) || { path: '' };
    if (image instanceof File) {
      path = URL.createObjectURL(image);
    } else if (image.path) {
      path = `${api_url}${image.path}`;
    }
    return path;
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

  render() {
    const { generationsHidden, noDeleteButton, noAddButton } = this.props;
    const { chapter, difficulty, grade, subject, name, id } = this.props.task;
    const showGens = (generationsHidden && this.state.showGens) || !generationsHidden;
    const Request = new Tasks();
    return (
      <div key={this.props.key} className={`${this.props.className} task-preview `}>
        <div className="task-preview__main">
          <EditableWithInput
            task={this.props.task}
            paramName="name"
            className="task-preview__title"
            handleFunction={Request.updateCheckJob}
          >
            {name || 'Название'}
          </EditableWithInput>
          <div className="task-preview__subtitle">{chapter}</div>
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
                  {console.log(generation)}
                  <EditableWithInput
                    task={generation}
                    paramName="name"
                    className="task-preview__title"
                    handleFunction={Request.updateGeneration}
                  >
                    {generation.text}
                  </EditableWithInput>
                  <span className="task-preview__subtitle">{generation.kind}</span>
                  <button>
                    <label htmlFor="edit-image">Change image</label>
                  </button>
                  <input
                    type="file"
                    id="edit-image"
                    className="task-preview__update-image"
                    onChange={e => {
                      this.savePicture(e);
                    }}
                  />
                  <ul className="task-preview__generations">
                    {answers.map((answer, index) => {
                      const letter = this.getLetter(index);
                      /* Если пришел массив файлов - берем из массива по индексу,
                      если массив сохраненных картинок в генерации - ищем по букве ответа
                      to do - Надо будет хранить файлы в store в объекте с полями-буквами,
                      которые соответсвуют букве ответа, чтобы было удобно их оттуда доставать */
                      const image = this.isArrayOfFiles(images)
                        ? images[index]
                        : images.find(item => item.answer == letter);
                      const imageSource = this.getImageUrl(image);
                      {
                        /* const url = generation.images
                        ? `${api_url}${imagePath}`
                        : URL.createObjectURL(image); */
                      }
                      return (
                        <li
                          className={`task-preview__generation-answer
                        ${generation.rightAnswers &&
                          (generation.answersType && generation.answersType[index]) &&
                          'task-preview__generation-answer--right'}`}
                          key={index}
                        >
                          <label htmlFor="edit-image">
                            <img className="task-preview__answer-image" src={imageSource} alt="" />
                          </label>
                          {this.state.image && (
                            <button onClick={() => this.uploadPicture(index, generation.id)}>
                              Submit
                            </button>
                          )}
                          <EditableAnswer
                            task={generation}
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

const mapStateToProps = state => ({
  general: state.general,
  checks: state.checks,
  images: state.images.images,
});

export default connect(mapStateToProps)(TaskPreviewContainer);
