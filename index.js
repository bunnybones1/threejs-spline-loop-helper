function SplineLoopHelper(splineLoop) {
	THREE.Object3D.call(this);

	var color = 0x7fafff;
	var ballGeometry = new THREE.SphereGeometry(.15);
	var pointHandleMaterial = new THREE.MeshBasicMaterial({
		color: color,
		depthTest: false,
		transparent: true
	});

	var pointHandles = [];
	var _this = this;
	splineLoop.points.forEach(function(point) {
		var pointHandle = new THREE.Mesh(ballGeometry, pointHandleMaterial);
		_this.add(pointHandle);
		pointHandle.renderDepth = 1;
		pointHandle.position.copy(point);
		pointHandle.point = point;
		pointHandles.push(pointHandle);
		pointHandle.updateMatrix();
		pointHandle.updateMatrixWorld();
	});

	var splineSegs = 100;
	var splineGeometry = new THREE.Geometry();

	var splineMaterial = new THREE.LineBasicMaterial({
	    color: color
	});

	var coord;
	for (var i = 0; i < splineSegs; i++) {
		coord = splineLoop.getCachedLoopPoint(i/splineSegs);
		var vert = new THREE.Vector3(coord.x, coord.y, coord.z);
		splineGeometry.vertices.push(vert);
	};
	var splineMesh = new THREE.Line(splineGeometry, splineMaterial);
	this.add(splineMesh);
}

SplineLoopHelper.prototype = Object.create(THREE.Object3D.prototype);
module.exports = SplineLoopHelper;