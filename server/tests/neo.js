import request from 'supertest-as-promised';
import app from '../../index';
import chai, { expect } from 'chai';

chai.config.includeStack = true;

describe('## Neo APIs', () => {
  describe('# GET /neo/hazardous', () => {
    it('should return hazardous NEOs', (done) => {
      request(app)
        .get('/neo/hazardous')
        .send()
        .expect(200)
        .then((res) => {
          expect(res.body)
            .to.be.an('array');
          res.body.forEach((item) => {
            expect(item)
              .to.be.an('object')
              .that.does.not.include({ 'isHazardous': false });
          });
          done();
        })
        .catch(done);
    });

  });

  describe('# GET /neo/fastest?hazardous=(true|false)', () => {
    it('should return the fastest non hazardous NEO', (done) => {
      request(app)
        .get('/neo/fastest')
        .send()
        .expect(200)
        .then((res) => {
          expect(res.body)
            .to.be.an('object')
            .that.includes({ 'isHazardous': false });
          done();
        })
        .catch(done);
    });

    it('should return the fastest non hazardous NEO', (done) => {
      request(app)
        .get('/neo/fastest?hazardous=false')
        .send()
        .expect(200)
        .then((res) => {
          expect(res.body)
            .to.be.an('object')
            .that.includes({ 'isHazardous': false });
          done();
        })
        .catch(done);
    });

    it('should return the fastest hazardous NEO', (done) => {
      request(app)
        .get('/neo/fastest?hazardous=true')
        .send()
        .expect(200)
        .then((res) => {
          expect(res.body)
            .to.be.an('object')
            .that.includes({ 'isHazardous': true });
          done();
        })
        .catch(done);
    });

  });

});
