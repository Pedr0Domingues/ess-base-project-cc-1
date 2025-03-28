const TestEntity = require('../entities/test.entity');
const TestModel = require('../models/test.model');
const OtherRepository = require('../repositories/other.repository');
const TestRepository = require('../repositories/test.repository');
const { HttpNotFoundError } = require('../utils/errors/http.error');

class TestServiceMessageCode {
  static test_not_found = 'test_not_found';
}

class TestService {
  constructor(testRepository, otherRepository) {
    this.testRepository = testRepository;
    this.otherRepository = otherRepository;
  }

  async getTests() {
    const testsEntity = await this.testRepository.getTests();
    const testsModel = testsEntity.map((test) => new TestModel(test));
    return testsModel;
  }

  async getOtherTests() {
    const testsEntity = await this.otherRepository.getTests();
    const testsModel = testsEntity.map((test) => new TestModel(test));
    return testsModel;
  }

  async getTest(id) {
    const testEntity = await this.testRepository.getTest(id);

    if (!testEntity) {
      throw new HttpNotFoundError({
        msg: 'Test not found',
        msgCode: TestServiceMessageCode.test_not_found,
      });
    }

    const testModel = new TestModel(testEntity);
    return testModel;
  }

  async createTest(data) {
    const testEntity = await this.testRepository.createTest(data);
    const testModel = new TestModel(testEntity);
    return testModel;
  }

  async updateTest(id, data) {
    const testEntity = await this.testRepository.updateTest(id, data);

    if (!testEntity) {
      throw new HttpNotFoundError({
        msg: 'Test not found',
        msgCode: TestServiceMessageCode.test_not_found,
      });
    }

    const testModel = new TestModel(testEntity);
    return testModel;
  }

  async deleteTest(id) {
    await this.testRepository.deleteTest(id);
  }
}

module.exports = TestService;


// import TestEntity from '../entities/test.entity';
// import TestModel from '../models/test.model';
// import OtherRepository from '../repositories/other.repository';
// import TestRepository from '../repositories/test.repository';
// import { HttpNotFoundError } from '../utils/errors/http.error';

// class TestServiceMessageCode {
//   public static readonly test_not_found = 'test_not_found';
// }

// class TestService {
//   private testRepository: TestRepository;
//   private otherRepository: OtherRepository;

//   constructor(
//     testRepository: TestRepository,
//     otherRepository: OtherRepository
//   ) {
//     this.testRepository = testRepository;
//     this.otherRepository = otherRepository;
//   }

//   public async getTests(): Promise<TestModel[]> {
//     const testsEntity = await this.testRepository.getTests();

//     const testsModel = testsEntity.map((test) => new TestModel(test));

//     return testsModel;
//   }

//   public async getOtherTests(): Promise<TestModel[]> {
//     const testsEntity = await this.otherRepository.getTests();

//     const testsModel = testsEntity.map((test) => new TestModel(test));

//     return testsModel;
//   }

//   public async getTest(id: string): Promise<TestModel> {
//     const testEntity = await this.testRepository.getTest(id);

//     if (!testEntity) {
//       throw new HttpNotFoundError({
//         msg: 'Test not found',
//         msgCode: TestServiceMessageCode.test_not_found,
//       });
//     }

//     const testModel = new TestModel(testEntity);

//     return testModel;
//   }

//   public async createTest(data: TestEntity): Promise<TestModel> {
//     const testEntity = await this.testRepository.createTest(data);
//     const testModel = new TestModel(testEntity);

//     return testModel;
//   }

//   public async updateTest(id: string, data: TestEntity): Promise<TestModel> {
//     const testEntity = await this.testRepository.updateTest(id, data);

//     if (!testEntity) {
//       throw new HttpNotFoundError({
//         msg: 'Test not found',
//         msgCode: TestServiceMessageCode.test_not_found,
//       });
//     }

//     const testModel = new TestModel(testEntity);

//     return testModel;
//   }

//   public async deleteTest(id: string): Promise<void> {
//     await this.testRepository.deleteTest(id);
//   }
// }

// export default TestService;
