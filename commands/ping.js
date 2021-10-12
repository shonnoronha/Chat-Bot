"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Replies with pong',
    slash: 'both',
    testOnly: true,
    callback: function (_a) {
        var interaction = _a.interaction;
        interaction.reply('pong new');
    }
};
