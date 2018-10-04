import models from '../database/index';

const create = function (goalId, milestone) {
	milestone.id = null;
	milestone.goalId = goalId;

	return models.Milestone.create(milestone);
};

const getAllByParent = function (goalId) {
	return models.Milestone.findAll({
		where: {
			goalId: goalId
		}
	});
};

const getSingle = function (milestoneId) {
	return models.Milestone.find({
		where: {
			id: milestoneId
		}
	});
};

const update = function(milestoneId, milestone) {
	return models.Milestone.update({
		name: milestone.name,
		description: milestone.description,
		plannedDate: milestone.plannedDate,
		actualDate: milestone.actualDate,
		value: milestone.value,
	}, {
		where: {
			id: milestoneId
		},
		returning: true
	}).then(([rowsUpdated, [updatedMilestone]]) => { // eslint-disable-line no-unused-vars
		return updatedMilestone;
	});
};

const remove = function(milestoneId) {
	return models.Milestone.destroy({
		where: {
			id: milestoneId
		}
	});
};

const checkIfExists = function (milestoneId) {
	return models.Milestone.count({
		where: {
			id: milestoneId
		}
	}).then(count => {
		return count !== 0;
	});
};

const milestoneRepository = {
	create,
	getSingle,
	getAllByParent,
	update,
	remove,
	checkIfExists
};

export {
	milestoneRepository
};