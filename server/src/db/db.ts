'use strict';

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', '21gizole', {
  host: '127.0.0.1',
  dialect: 'postgres',
});
