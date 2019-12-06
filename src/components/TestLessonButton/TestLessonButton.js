import React, { Component, Fragment } from "react";
import './test-lesson-button.scss';

class TestLessonButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingLesson: false,
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.lesson !== this.props.lesson) {
      this.setState({ fetchingLesson: false });
    }
  }

  createTestStudentUrl = (taskLesson = {}) => {
    const { student_id } = taskLesson;
    const studentUrl = `/admin/students/${student_id}`;
    return studentUrl;
  }

  onClick = (evt) => {
    evt.stopPropagation();
    const { buttonCreateLessonHandler } = this.props;
    buttonCreateLessonHandler();
    this.setState({ fetchingLesson: true });
  }


  render = () => {
    const { className, lesson } = this.props;
    const { fetchingLesson } = this.state;
    const urlToTestStudent = lesson ? this.createTestStudentUrl(lesson) : null;

    return (
      <Fragment>
        {lesson
          ? (<a className="lesson-link" href={`${urlToTestStudent}`} target="_blank">
              {`${urlToTestStudent}`}
            </a>)
          : (<button
              type="button"
              className={`${className} create-lesson-button`}
              onClick={this.onClick}
            >
              {fetchingLesson ? "Выполняю запрос..." : "Создать урок"}
            </button>)
        }
      </Fragment>
    );
  }
}

export default TestLessonButton;
