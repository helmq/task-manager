import React from 'react';
import Board from 'react-trello';
import { fetch } from '../fetch';
import LaneHeader from './LaneHeader';

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

  fetchLine = (state, page = 1) => fetch(
    'GET',
    window.Routes.api_v1_tasks_path({
      q: { state_eq: state },
      page,
      per_page: 10,
      format: 'json',
    }),
  ).then(({ data }) => data);

  onLaneScroll = async (requestedPage, state) => {
    const { items } = await this.fetchLine(state, requestedPage);
    return items.map(task => ({
      ...task,
      label: task.state,
      title: task.name,
    }));
  };

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const { events } = this.state;
    const event = events[targetLaneId];

    fetch('PUT', window.Routes.api_v1_task_path(cardId, { format: 'json' }), {
      task: { state_event: event },
    }).finally(() => {
      this.loadLine(sourceLaneId);
      this.loadLine(targetLaneId);
    });
  };

  async loadLine(state, page = 1) {
    const data = await this.fetchLine(state, page);
    this.setState(({ board }) => ({
      board: {
        ...board,
        [state]: data,
      },
    }));
  }

  generateLane(id, title) {
    const { board } = this.state;
    const tasks = board[id];

    return {
      id,
      title,
      total_count: tasks ? tasks.meta.total_count : 'None',
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
    return (
      <div>
        <h1>Your tasks</h1>
        <Board
          data={this.getBoard()}
          onLaneScroll={this.onLaneScroll}
          customLaneHeader={<LaneHeader />}
          draggable
          laneDraggable={false}
          handleDragEnd={this.handleDragEnd}
        />
      </div>
    );
  }
}
