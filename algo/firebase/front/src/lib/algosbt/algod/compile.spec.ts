import { expect } from 'chai';

import { testNetAlgod as algod } from './algods';
import approvalTeal from '../teal/revokedApproval.teal';
import compile from './compile';

describe('compile', () => {
  it('should work', async () => {
    const program = compile(algod, approvalTeal);

    expect(program).to.not.be.undefined;
  });
});
