import React from 'react';
import Board from 'react-trello';
import { Button } from 'react-bootstrap';
import { fetch } from '../fetch';
import LaneHeader from './LaneHeader';
import AddPopup from './AddPopup';
import EditPopup from './EditPopup';

export default class TaskBoard extends React.Component {
  state = {
    board: {
      new_task: null,
      in_development: null,
      in_qa: null,
      in_code_review: null,
      ready_for_release: null,
      released: null,
      archived: null,
    },
    events: {
      new_task: null,
      in_development: 'develop',
      in_qa: 'qa',
      in_code_review: 'review',
      ready_for_release: 'ready',
      released: 'release',
      archived: 'archive',
    },
    addPopupShow: false,
    editPopupShow: false,
    editCardId: null,
  };

  componentDidMount() {
    this.loadLines();
  }

  getBoard() {
    return {
      lanes: [
        this.generateLane('new_task', 'New'),
        this.generateLane('in_development', 'In Dev'),
        this.generateLane('in_qa', 'In QA'),
        this.generateLane('in_code_review', 'In CR'),
        this.generateLane('ready_for_release', 'Ready for release'),
        this.generateLane('released', 'Released'),
        this.generateLane('archived', 'Archived'),
      ],
    };
  }

  fetchLine = async (state, page = 1) => {
    try {
      const { data } = await fetch(
        'GET',
        window.Routes.api_v1_tasks_path({
          q: { state_eq: state },
          page,
          per_page: 10,
          format: 'json',
        }),
      );
      return data;
    } catch (e) {
      console.log(`Load failed! ${e.response.status} - ${e.response.statusText}`);
      return null;
    }
  };

  onLaneScroll = async (requestedPage, state) => {
    const { items } = await this.fetchLine(state, requestedPage);

    return items.map(task => ({
      ...task,
      label: task.state,
      title: task.name,
    }));
  };

  handleDragEnd = async (cardId, sourceLaneId, targetLaneId) => {
    const { events } = this.state;
    const event = events[targetLaneId];

    await fetch('PUT', window.Routes.api_v1_task_path(cardId, { format: 'json' }), {
      task: { state_event: event },
    });
    this.loadLine(sourceLaneId);
    this.loadLine(targetLaneId);
  };

  handleAddShow = () => {
    this.setState({ addPopupShow: true });
  };

  handleAddClose = (added = false) => {
    this.setState({ addPopupShow: false });
    if (added === true) {
      this.loadLine('new_task');
    }
  };

  onCardClick = cardId => {
    this.setState({ editCardId: cardId });
    this.handleEditShow();
  };

  handleEditClose = (edited = '') => {
    this.setState({ editPopupShow: false, editCardId: null });
    switch (edited) {
      case 'new_task':
      case 'in_development':
      case 'in_qa':
      case 'in_code_review':
      case 'ready_for_release':
      case 'released':
      case 'archived':
        this.loadLine(edited);
        break;
      default:
        break;
    }
  };

  handleEditShow = () => {
    this.setState({ editPopupShow: true });
  };

  async loadLine(state, page = 1) {
    try {
      const tasks = await this.fetchLine(state, page);
      this.setState(({ board }) => ({
        board: {
          ...board,
          [state]: tasks,
        },
      }));
    } catch (e) {
      console.log(`Load failed! ${e.response.status} - ${e.response.statusText}`);
    }
  }

  generateLane(id, title) {
    const { board } = this.state;
    const tasks = board[id];

    return {
      id,
      title,
      totalCount: tasks ? tasks.meta.total_count : 0,
      cards: tasks
        ? tasks.items.map(task => ({
            ...task,
            label: task.state,
            title: task.name,
          }))
        : [],
    };
  }

  loadLines() {
    this.loadLine('new_task');
    this.loadLine('in_development');
    this.loadLine('in_qa');
    this.loadLine('in_code_review');
    this.loadLine('ready_for_release');
    this.loadLine('released');
    this.loadLine('archived');
  }

  render() {
    const { addPopupShow, editPopupShow, editCardId } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <h3>Your tasks</h3>
          <Button variant="primary" onClick={this.handleAddShow}>
            Create new task
          </Button>
        </div>

        <div>
          <Board
            data={this.getBoard()}
            onLaneScroll={this.onLaneScroll}
            customLaneHeader={<LaneHeader />}
            draggable
            laneDraggable={false}
            handleDragEnd={this.handleDragEnd}
            onCardClick={this.onCardClick}
          />
          <EditPopup show={editPopupShow} onClose={this.handleEditClose} cardId={editCardId} />
          <AddPopup show={addPopupShow} onClose={this.handleAddClose} />
        </div>
      </div>
    );
  }
}
