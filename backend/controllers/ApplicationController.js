const ApplicationService = require('../services/ApplicationService');
const { check, validationResult } = require('express-validator');


exports.createNewApplication =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const fileInfo = req.body
        fileInfo.userID = req.token.userId
        console.log(fileInfo)
        await ApplicationService.createFile(fileInfo);
        res.status(200).json({ CreateSuccess: true });
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
};


exports.searchByID = async (req, res) => {
    try {
        //下面req.body 需要改成存储于前端的userID（无论是存在cookie里还是哪的）
        const Application = await ApplicationService.getApplicationById(req.params.id)
        res.status(200).json(Application);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

}

exports.searchByPID = async (req, res) => {
    try {
        //下面req.body 需要改成存储于前端的userID（无论是存在cookie里还是哪的）
        const Application = await ApplicationService.getApplicationById(req.token.userId)
        res.status(200).json(Application);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

}

exports.getAllInfo = async (req, res) => {
    try {
        const Application = await ApplicationService.getApplications()
        res.status(200).json(Application);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

}

exports.updateStatusApprove = async (req, res) => {
    try {
        //下面req.session.id 需要改成存储于前端的userID（无论是存在cookie里还是哪的）
        //req.body为修改的状态
        const Application = await ApplicationService.changeStatusApprove(req.params.id)
        res.status(200).json(Application);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
}

exports.updateStatusReject = async (req, res) => {
    try {
        //下面req.session.id 需要改成存储于前端的userID（无论是存在cookie里还是哪的）
        //req.body为修改的状态
        const Application = await ApplicationService.changeStatusReject(req.params.id, req.body.feedback)
        res.status(200).json(Application);
    } catch (e) {
        res.status(404).json({ error: e.message });
    }

}