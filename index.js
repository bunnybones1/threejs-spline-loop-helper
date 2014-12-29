var _ = require('lodash');
function SplineLoopHelper(splineLoop, options) {
	options = _.merge({
		color: 0x7f6f5f,
		handleRadius: .15,
		alwaysOnTop: true
	}, options || {});

	THREE.Object3D.call(this);

	var ballGeometry = new THREE.SphereGeometry(options.handleRadius);
	var handleMaterial = new THREE.MeshBasicMaterial({
		color: options.color,
		depthTest: false,
		transparent: true,
		blending: THREE.AdditiveBlending
	});

	var handles = this.handles = [];
	var _this = this;
	this.splineLoop = splineLoop;
	splineLoop.points.forEach(function(point) {
		var handle = new THREE.Mesh(ballGeometry, handleMaterial);
		_this.add(handle);
		handle.renderDepth = options.alwaysOnTop ? 1 : undefined;
		handle.position.copy(point);
		handle.point = point;
		handles.push(handle);
		handle.updateMatrix();
		handle.updateMatrixWorld();
	});

	var segments = this.segments = 100;
	var splineGeometry = this.splineGeometry = new THREE.Geometry();

	var splineMaterial = new THREE.LineBasicMaterial({
	    color: options.color
	});

	var coord;
	for (var i = 0; i < segments; i++) {
		coord = splineLoop.getCachedLoopPoint(i/segments);
		var vert = new THREE.Vector3(coord.x, coord.y, coord.z);
		splineGeometry.vertices.push(vert);
	};
	splineGeometry.vertices.push(splineGeometry.vertices[0]);

	var splineMesh = new THREE.Line(splineGeometry, splineMaterial);
	splineMesh.renderDepth = options.alwaysOnTop ? 1 : undefined;
	
	this.add(splineMesh);
}

SplineLoopHelper.prototype = Object.create(THREE.Object3D.prototype);

SplineLoopHelper.prototype.update = function() {
	for (var i = 0, len = this.segments; i < len; i++) {
		this.splineGeometry.vertices[i].copy(this.splineLoop.getCachedLoopPoint(i/len));
	};
	this.splineGeometry.verticesNeedUpdate = true;
}
module.exports = SplineLoopHelper;