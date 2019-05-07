/// <reference path="./../typings/mongoose.d.ts" />

import 'mocha';

import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';

import { Mockgoose } from 'mockgoose';

global.Promise = bluebird;
(<any>mongoose).Promise = bluebird;

import { default as chai, expect } from './chai';
import '../src';

const mockgoose = new Mockgoose(mongoose);

export type HtmlModel = mongoose.Document & {
  content?: string
};

const HtmlDefault = mongoose.model('HtmlDefault', new mongoose.Schema({
  content: mongoose.SchemaTypes.Html
}));

const HtmlNoPurifyNoSanitize = mongoose.model('HtmlNoPurifyNoSanitize', new mongoose.Schema({
  content: { type: mongoose.SchemaTypes.Html, dompurify: false }
}));

const HtmlPurifyAndSanitize = mongoose.model('HtmlPurifyAndSanitize', new mongoose.Schema({
  content: { type: mongoose.SchemaTypes.Html, dompurify: true, sanitizehtml: true }
}));

describe('mongoose-type-html', () => {
  before((done: Function) => {
    mongoose.connection.on('error', () => { });
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://example.com/TestingDB', function (err) {
        if (err) done(err);
        done();
      });
    });
  });

  after((done: Function) => {
    mongoose.connection.close((err: any) => {
      if (err) done(err);
      done();
    });
  });

  it('should enable basic html field-type in schema', async (done: Function) => {
    const html: HtmlModel = new HtmlDefault();

    expect(html.schema.obj.content.schemaName.toLowerCase()).equals('html');

    done();
  });

  it('should remove content "<script>Hello</script>" with purify true and sanitize false', (done: Function) => {
    const html: HtmlModel = new HtmlDefault();
    html.content = '<script>Hello</script>';

    html
      .save()
      .then((val: mongoose.Document) => {
        expect(val).property('content').is.empty;
        done();
      }, (err: any) => {
        console.error(err);
        done(err);
      });
  });

  it('should remove content "<script>Hello</script>" with purify true and sanitize true', (done: Function) => {
    const html: HtmlModel = new HtmlPurifyAndSanitize();
    html.content = '<script>Hello</script>';

    html
      .save()
      .then((val: mongoose.Document) => {
        expect(val).property('content').is.empty;
        done();
      }, (err: any) => {
        console.error(err);
        done(err);
      });
  });

  it('should not remove content "<script>Hello</script>" with purify false and sanitize false', (done: Function) => {
    const testString = '<script>Hello</script>';

    const html: HtmlModel = new HtmlNoPurifyNoSanitize();
    html.content = testString;

    html
      .save()
      .then((val: mongoose.Document) => {
        expect(val).property('content').is.equal(testString);
        done();
      }, (err: any) => {
        console.error(err);
        done(err);
      });
  });

});
