const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/', async (req, res) => {    
  if (req.user) {

    const query = {};

    for(const k in req.query.params) { 
      if (k === 'limit') continue;
      if (k === 'skip') continue;
      const v = req.query.params[i];
      query[k] = v;
    }

    res.send(await db.getPushes(query));  
  } else {
    res.status(401).send({
      message: 'not logged in'
    });
  }
})

router.get('/:id', async(req, res) => {    
  if (req.user) {
    const id = req.params.id  
    res.send(await db.getPush(id));
  } else {
    res.status(401).send({
      message: 'not logged in'
    });
  }
})

router.post('/:id/reject', async(req, res) => { 
  if (req.user) { 
    const id = req.params.id  
    const result = await db.reject(id);
    res.send(result);
  } else {
    res.status(401).send({
      message: 'not logged in'
    });
  }
});

router.post('/:id/authorise',  async (req, res) => { 
  if (req.user) { 
    const id = req.params.id  
    const result = await db.authorise(id);
    res.send(result);
  } else {
    res.status(401).send({
      message: 'not logged in'
    });
  }
});

router.post('/:id/cancel', async (req, res) => { 
  if (req.user) { 
    const id = req.params.id  
    const result = await db.cancel(id);
    res.send(result);
  } else {
    res.status(401).send({
      message: 'not logged in'
    });
  }
});

module.exports = router;
