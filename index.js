var _ = require('lodash');
function SplineLoopHelper(splineLoop, options) {
	options = _.merge({
		color: 0x7fafff,
		handleRadius: .15,
		alwaysOnTop: true
	}, options || {});

	THREE.Object3D.call(this);

	var ballGeometry = new THREE.SphereGeometry(options.handleRadius);
	var pointHandleMaterial = new THREE.MeshBasicMaterial({
		color: options.color,
		depthTest: false,
		transparent: true
	});

	var pointHandles = [];
	var _this = this;
	splineLoop.points.forEach(function(point) {
		var pointHandle = new THREE.Mesh(ballGeometry, pointHandleMaterial);
		_this.add(pointHandle);
		pointHandle.renderDepth = options.alwaysOnTop ? 1 : undefined;
		pointHandle.position.copy(point);
		pointHandle.point = point;
		pointHandles.push(pointHandle);
		pointHandle.updateMatrix();
		pointHandle.updateMatrixWorld();
	});

	var splineSegs = 100;
	var splineGeometry = new THREE.Geometry();

	var splineMaterial = new THREE.LineBasicMaterial({
	    color: options.color
	});

	var coord;
	for (var i = 0; i < splineSegs; i++) {
		coord = splineLoop.getCachedLoopPoint(i/splineSegs);
		var vert = new THREE.Vector3(coord.x, coord.y, coord.z);
		splineGeometry.vertices.push(vert);
	};
	var splineMesh = new THREE.Line(splineGeometry, splineMaterial);
	splineMesh.renderDepth = options.alwaysOnTop ? 1 : undefined;
	
	this.add(splineMesh);
}

SplineLoopHelper.prototype = Object.create(THREE.Object3D.prototype);
module.exports = SplineLoopHelper;