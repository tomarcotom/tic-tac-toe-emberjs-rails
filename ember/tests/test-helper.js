import Application from 'tic-tac-toe-emberjs-rails/app';
import config from 'tic-tac-toe-emberjs-rails/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
