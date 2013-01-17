/*global defineSuite*/
defineSuite([
         'Core/Transforms',
         'Core/Cartesian2',
         'Core/Cartesian3',
         'Core/Cartesian4',
         'Core/Ellipsoid',
         'Core/JulianDate',
         'Core/Matrix3',
         'Core/Matrix4',
         'Core/Math',
         'Core/Quaternion',
         'Core/TimeConstants',
         'Core/TimeInterval',
         'Core/EarthOrientationData',
         'ThirdParty/when'
     ], function(
         Transforms,
         Cartesian2,
         Cartesian3,
         Cartesian4,
         Ellipsoid,
         JulianDate,
         Matrix3,
         Matrix4,
         CesiumMath,
         Quaternion,
         TimeConstants,
         TimeInterval,
         EarthOrientationData,
         when) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/

    it('eastNorthUpToFixedFrame works without a result parameter', function() {
        var origin = new Cartesian3(1.0, 0.0, 0.0);
        var expectedTranslation = new Cartesian4(origin.x, origin.y, origin.z, 1.0);

        var returnedResult = Transforms.eastNorthUpToFixedFrame(origin, Ellipsoid.UNIT_SPHERE);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_Z); // north
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_X); // up
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('eastNorthUpToFixedFrame works with a result parameter', function() {
        var origin = new Cartesian3(1.0, 0.0, 0.0);
        var expectedTranslation = new Cartesian4(origin.x, origin.y, origin.z, 1.0);
        var result = new Matrix4(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);

        var returnedResult = Transforms.eastNorthUpToFixedFrame(origin, Ellipsoid.UNIT_SPHERE, result);
        expect(result).toBe(returnedResult);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_Z); // north
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_X); // up
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('eastNorthUpToFixedFrame works at the north pole', function() {
        var northPole = new Cartesian3(0.0, 0.0, 1.0);
        var expectedTranslation = new Cartesian4(northPole.x, northPole.y, northPole.z, 1.0);

        var result = new Matrix4();
        var returnedResult = Transforms.eastNorthUpToFixedFrame(northPole, Ellipsoid.UNIT_SPHERE, result);
        expect(returnedResult).toBe(result);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_X.negate()); // north
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_Z); // up
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('eastNorthUpToFixedFrame works at the south pole', function() {
        var southPole = new Cartesian3(0.0, 0.0, -1.0);
        var expectedTranslation = new Cartesian4(southPole.x, southPole.y, southPole.z, 1.0);

        var returnedResult = Transforms.eastNorthUpToFixedFrame(southPole, Ellipsoid.UNIT_SPHERE);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_X); // north
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_Z.negate()); // up
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('northEastDownToFixedFrame works without a result parameter', function() {
        var origin = new Cartesian3(1.0, 0.0, 0.0);
        var expectedTranslation = new Cartesian4(origin.x, origin.y, origin.z, 1.0);

        var returnedResult = Transforms.northEastDownToFixedFrame(origin, Ellipsoid.UNIT_SPHERE);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_Z); // north
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_X.negate()); // down
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('northEastDownToFixedFrame works with a result parameter', function() {
        var origin = new Cartesian3(1.0, 0.0, 0.0);
        var expectedTranslation = new Cartesian4(origin.x, origin.y, origin.z, 1.0);
        var result = new Matrix4(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);

        var returnedResult = Transforms.northEastDownToFixedFrame(origin, Ellipsoid.UNIT_SPHERE, result);
        expect(result).toBe(returnedResult);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_Z); // north
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_X.negate()); // down
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('northEastDownToFixedFrame works at the north pole', function() {
        var northPole = new Cartesian3(0.0, 0.0, 1.0);
        var expectedTranslation = new Cartesian4(northPole.x, northPole.y, northPole.z, 1.0);

        var result = new Matrix4();
        var returnedResult = Transforms.northEastDownToFixedFrame(northPole, Ellipsoid.UNIT_SPHERE, result);
        expect(returnedResult).toBe(result);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_X.negate()); // north
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_Z.negate()); // down
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('northEastDownToFixedFrame works at the south pole', function() {
        var southPole = new Cartesian3(0.0, 0.0, -1.0);
        var expectedTranslation = new Cartesian4(southPole.x, southPole.y, southPole.z, 1.0);

        var returnedResult = Transforms.northEastDownToFixedFrame(southPole, Ellipsoid.UNIT_SPHERE);
        expect(returnedResult.getColumn(0)).toEqual(Cartesian4.UNIT_X); // north
        expect(returnedResult.getColumn(1)).toEqual(Cartesian4.UNIT_Y); // east
        expect(returnedResult.getColumn(2)).toEqual(Cartesian4.UNIT_Z); // down
        expect(returnedResult.getColumn(3)).toEqual(expectedTranslation); // translation
    });

    it('computeTemeToPseudoFixedMatrix works before noon', function() {
        var time = new JulianDate();
        var secondsDiff = TimeConstants.SECONDS_PER_DAY - time.getSecondsOfDay();
        time = time.addSeconds(secondsDiff);

        var t = Transforms.computeTemeToPseudoFixedMatrix(time);

        // rotation matrix determinants are 1.0
        var det = t[0] * t[4] * t[8] + t[3] * t[7] * t[2] + t[6] * t[1] * t[5] - t[6] * t[4] * t[2] - t[3] * t[1] * t[8] - t[0] * t[7] * t[5];
        expect(det).toEqualEpsilon(1.0, CesiumMath.EPSILON14);

        // rotation matrix inverses are equal to its transpose
        var t4 = Matrix4.fromRotationTranslation(t, Cartesian3.ZERO);
        expect(t4.inverse()).toEqualEpsilon(t4.inverseTransformation(), CesiumMath.EPSILON14);

        time = time.addHours(23.93447); // add one sidereal day
        var u = Transforms.computeTemeToPseudoFixedMatrix(time);
        var tAngle = Quaternion.fromRotationMatrix(t).getAngle();
        var uAngle = Quaternion.fromRotationMatrix(u).getAngle();
        expect(tAngle).toEqualEpsilon(uAngle, CesiumMath.EPSILON6);
    });

    it('computeTemeToPseudoFixedMatrix works after noon', function() {
        var time = new JulianDate();
        var secondsDiff = TimeConstants.SECONDS_PER_DAY - time.getSecondsOfDay();
        time = time.addSeconds(secondsDiff + TimeConstants.SECONDS_PER_DAY * 0.5);

        var t = Transforms.computeTemeToPseudoFixedMatrix(time);

        // rotation matrix determinants are 1.0
        var det = t[0] * t[4] * t[8] + t[3] * t[7] * t[2] + t[6] * t[1] * t[5] - t[6] * t[4] * t[2] - t[3] * t[1] * t[8] - t[0] * t[7] * t[5];
        expect(det).toEqualEpsilon(1.0, CesiumMath.EPSILON14);

        // rotation matrix inverses are equal to its transpose
        var t4 = Matrix4.fromRotationTranslation(t, Cartesian3.ZERO);
        expect(t4.inverse()).toEqualEpsilon(t4.inverseTransformation(), CesiumMath.EPSILON14);

        time = time.addHours(23.93447); // add one sidereal day
        var u = Transforms.computeTemeToPseudoFixedMatrix(time);
        var tAngle = Quaternion.fromRotationMatrix(t).getAngle();
        var uAngle = Quaternion.fromRotationMatrix(u).getAngle();
        expect(tAngle).toEqualEpsilon(uAngle, CesiumMath.EPSILON6);
    });

    it('computeTemeToPseudoFixedMatrix works with a result parameter', function() {
        var time = new JulianDate();
        var secondsDiff = TimeConstants.SECONDS_PER_DAY - time.getSecondsOfDay();
        time = time.addSeconds(secondsDiff);

        var resultT = new Matrix3();
        var t = Transforms.computeTemeToPseudoFixedMatrix(time, resultT);
        expect(t).toBe(resultT);

        // rotation matrix determinants are 1.0
        var det = t[0] * t[4] * t[8] + t[3] * t[7] * t[2] + t[6] * t[1] * t[5] - t[6] * t[4] * t[2] - t[3] * t[1] * t[8] - t[0] * t[7] * t[5];
        expect(det).toEqualEpsilon(1.0, CesiumMath.EPSILON14);

        // rotation matrix inverses are equal to its transpose
        var t4 = Matrix4.fromRotationTranslation(t, Cartesian3.ZERO);
        expect(t4.inverse()).toEqualEpsilon(t4.inverseTransformation(), CesiumMath.EPSILON14);

        time = time.addHours(23.93447); // add one sidereal day
        var resultU = new Matrix3();
        var u = Transforms.computeTemeToPseudoFixedMatrix(time, resultU);
        expect(u).toBe(resultU);
        var tAngle = Quaternion.fromRotationMatrix(t).getAngle();
        var uAngle = Quaternion.fromRotationMatrix(u).getAngle();
        expect(tAngle).toEqualEpsilon(uAngle, CesiumMath.EPSILON6);
    });

    describe('computeIcrfToFixedMatrix', function() {
        function preloadTransformationData(start, stop) {
            var ready = false;

            runs(function() {
                var preloadInterval = new TimeInterval(start, stop);
                when(Transforms.preloadIcrfFixed(preloadInterval), function() {
                    ready = true;
                });
            });

            waitsFor(function() {
                return ready;
            });
        }

        it('works with hard-coded data', function() {
            // 2012-07-03 00:00:00 UTC
            var time = new JulianDate(2455745, 43200);

            preloadTransformationData(time, time);

            runs(function() {
                // Make sure to clear the data in case it's been set by another test
                EarthOrientationData.clear();
                // These values come from the STK Components ICRF Validation for the time above
                EarthOrientationData.eop.push(new EarthOrientationData.OrientationParameterData(
                        0.046663 * CesiumMath.RADIANS_PER_ARCSECOND, 0.437099 * CesiumMath.RADIANS_PER_ARCSECOND,
                        -0.2905572, -0.000072 * CesiumMath.RADIANS_PER_ARCSECOND, 0.000144 * CesiumMath.RADIANS_PER_ARCSECOND));

                var resultT = new Matrix3();
                var t = Transforms.computeIcrfToFixedMatrix(time, resultT);
                expect(t).toBe(resultT);

                // rotation matrix determinants are 1.0
                var det = t[0] * t[4] * t[8] + t[3] * t[7] * t[2] + t[6] * t[1] * t[5] - t[6] * t[4] * t[2] - t[3] * t[1] * t[8] - t[0] * t[7] * t[5];
                expect(det).toEqualEpsilon(1.0, CesiumMath.EPSILON14);

                // rotation matrix inverses are equal to its transpose
                var t4 = Matrix4.fromRotationTranslation(t, Cartesian3.ZERO);
                expect(t4.inverse()).toEqualEpsilon(t4.inverseTransformation(), CesiumMath.EPSILON14);

                time = time.addHours(23.93447); // add one sidereal day
                var resultU = new Matrix3();
                var u = Transforms.computeIcrfToFixedMatrix(time, resultU);
                expect(u).toBe(resultU);
                var tAngle = Quaternion.fromRotationMatrix(t).getAngle();
                var uAngle = Quaternion.fromRotationMatrix(u).getAngle();
                expect(tAngle).toEqualEpsilon(uAngle, CesiumMath.EPSILON6);

                // The rotation matrix from STK Components corresponding to the time and data inputs above
                var expectedMtx = new Matrix3(
                        0.18264414843630006, -0.98317906144315947, -0.00021950336420248503,
                        0.98317840915224974, 0.18264428011734501, -0.0011325710874539787,
                        0.0011536112127187594, -0.0000089534866085598909, 0.99999933455028112);

                var testInverse = t.transpose().multiply(expectedMtx);
                var testDiff = new Matrix3();
                for (var i=0; i<9; i++){
                    testDiff[i] = t[i] - expectedMtx[i];
                }
                expect(testInverse).toEqualEpsilon(Matrix3.IDENTITY, CesiumMath.EPSILON15);
                expect(testDiff).toEqualEpsilon(new Matrix3(), CesiumMath.EPSILON15);
            });
        });

        it('works over day boundary', function() {

            var time = new JulianDate(2455745, 86395);

            preloadTransformationData(time, time);

            runs(function() {
                // Make sure to clear the data in case it's been set by another test
                EarthOrientationData.clear();
                // These values come from the STK Components ICRF Validation for the time above
                EarthOrientationData.eop.push(new EarthOrientationData.OrientationParameterData(
                        0.0000002301721108351985, 0.0000021209335928745266, -0.29062894169560183,
                        -0.00000000048479796955505559, 0.00000000074175988195507851));

                var resultT = new Matrix3();
                var t = Transforms.computeIcrfToFixedMatrix(time, resultT);

                // The rotation matrix from STK Components corresponding to the time and data inputs above
                var expectedMtx = new Matrix3(
                        -0.19073578935932833, 0.98164138366748721, 0.00022919174269963536,
                        -0.98164073712836186, -0.19073592679333939, 0.0011266944449015753,
                        0.0011497249933208494, -0.000010082996932331842, 0.99999933901516791);

                var testInverse = t.transpose().multiply(expectedMtx);
                var testDiff = new Matrix3();
                for (var i=0; i<9; i++){
                    testDiff[i] = t[i] - expectedMtx[i];
                }
                expect(testInverse).toEqualEpsilon(Matrix3.IDENTITY, CesiumMath.EPSILON15);
                expect(testDiff).toEqualEpsilon(new Matrix3(), CesiumMath.EPSILON15);
            });
        });

        it('works over day boundary backwards', function() {

            var time = new JulianDate(2455745, 10);

            preloadTransformationData(time, time);

            runs(function() {
                // Make sure to clear the data in case it's been set by another test
                EarthOrientationData.clear();
                // These values come from the STK Components ICRF Validation for the time above
                EarthOrientationData.eop.push(new EarthOrientationData.OrientationParameterData(
                        0.00000022277995715869222, 0.000002117288427504905, -0.29060358925925928,
                        -0.00000000021577295007575856, 0.00000000063027349699687717));

                var resultT = new Matrix3();
                var t = Transforms.computeIcrfToFixedMatrix(time, resultT);

                //The rotation matrix from STK Components corresponding to the time and data inputs above
                var expectedMtx = new Matrix3(
                        -0.17489910479510423, 0.984586338811966, 0.00021110831245616662,
                        -0.98458569065286827, -0.17489923190143036, 0.0011297972845023996,
                        0.0011493056536445096, -0.00001025368996280683, 0.99999933949547);

                var testInverse = t.transpose().multiply(expectedMtx);
                var testDiff = new Matrix3();
                for (var i=0; i<9; i++){
                    testDiff[i] = t[i] - expectedMtx[i];
                }
                expect(testInverse).toEqualEpsilon(Matrix3.IDENTITY, CesiumMath.EPSILON15);
                expect(testDiff).toEqualEpsilon(new Matrix3(), CesiumMath.EPSILON15);
            });
        });

        it('works with position rotation', function() {

            // GEO Satellite position
            var inertialPos = new Cartesian3(-7322101.15395708, -41525699.1558387, 0);
            // The following is the value computed by STK Components for the date specified below
            var expectedFixedPos = new Cartesian3(39489858.9917795, -14783363.192887, -8075.05820056297);

            // 2012-07-03 00:00:00 UTC
            var time = new JulianDate(2455745, 43200);

            preloadTransformationData(time, time);

            runs(function() {
                // Make sure to clear the data in case it's been set by another test
                EarthOrientationData.clear();
                // These values come from the STK Components ICRF Validation for the time above
                EarthOrientationData.eop.push(new EarthOrientationData.OrientationParameterData(
                        0.046663 * CesiumMath.RADIANS_PER_ARCSECOND, 0.437099 * CesiumMath.RADIANS_PER_ARCSECOND,
                        -0.2905572, -0.000072 * CesiumMath.RADIANS_PER_ARCSECOND, 0.000144 * CesiumMath.RADIANS_PER_ARCSECOND));

                var resultT = new Matrix3();
                var t = Transforms.computeIcrfToFixedMatrix(time, resultT);

                var result = t.multiplyByVector(inertialPos);
                var error = result.subtract(expectedFixedPos);

                // Given the magnitude of the positions involved (1e8)
                // this tolerance represents machine precision
                expect(error).toEqualEpsilon(Cartesian3.ZERO, CesiumMath.EPSILON7);
            });
        });
    });

    var width = 1024.0;
    var height = 768.0;
    var perspective = Matrix4.computePerspectiveFieldOfView(CesiumMath.toRadians(60.0), width / height, 1.0, 10.0);
    var vpTransform = Matrix4.computeViewportTransformation({
        width : width,
        height : height
    });

    it('pointToWindowCoordinates works at the center', function() {
        var view = Matrix4.fromCamera({
            eye : Cartesian3.UNIT_X.multiplyByScalar(2.0),
            target : Cartesian3.ZERO,
            up : Cartesian3.UNIT_Z
        });
        var mvpMatrix = perspective.multiply(view);

        var expected = new Cartesian2(width * 0.5, height * 0.5);
        var returnedResult = Transforms.pointToWindowCoordinates(mvpMatrix, vpTransform, Cartesian3.ZERO);
        expect(returnedResult).toEqual(expected);
    });

    it('pointToWindowCoordinates works with a result parameter', function() {
        var view = Matrix4.fromCamera({
            eye : Cartesian3.UNIT_X.multiplyByScalar(2.0),
            target : Cartesian3.ZERO,
            up : Cartesian3.UNIT_Z
        });
        var mvpMatrix = perspective.multiply(view);

        var expected = new Cartesian2(width * 0.5, height * 0.5);
        var result = new Cartesian2();
        var returnedResult = Transforms.pointToWindowCoordinates(mvpMatrix, vpTransform, Cartesian3.ZERO, result);
        expect(result).toBe(returnedResult);
        expect(returnedResult).toEqual(expected);
    });

    it('pointToWindowCoordinates works at the lower left', function() {
        var z = -perspective[Matrix4.COLUMN3ROW2] / perspective[Matrix4.COLUMN2ROW2];
        var x = z / perspective[Matrix4.COLUMN0ROW0];
        var y = z / perspective[Matrix4.COLUMN1ROW1];
        var point = new Cartesian3(x, y, z);

        var expected = new Cartesian2(0.0, 0.0);
        var returnedResult = Transforms.pointToWindowCoordinates(perspective, vpTransform, point);
        expect(returnedResult).toEqualEpsilon(expected, CesiumMath.EPSILON12);
    });

    it('pointToWindowCoordinates works at the upper right', function() {
        var z = -perspective[Matrix4.COLUMN3ROW2] / perspective[Matrix4.COLUMN2ROW2];
        var x = -z / perspective[Matrix4.COLUMN0ROW0];
        var y = -z / perspective[Matrix4.COLUMN1ROW1];
        var point = new Cartesian3(x, y, z);
        var expected = new Cartesian2(width, height);

        var returnedResult = Transforms.pointToWindowCoordinates(perspective, vpTransform, point);
        expect(returnedResult).toEqualEpsilon(expected, CesiumMath.EPSILON12);
    });

    it('eastNorthUpToFixedFrame throws without an origin', function() {
        expect(function() {
            Transforms.eastNorthUpToFixedFrame(undefined, Ellipsoid.WGS84);
        }).toThrow();
    });

    it('northEastDownToFixedFrame throws without an origin', function() {
        expect(function() {
            Transforms.northEastDownToFixedFrame(undefined, Ellipsoid.WGS84);
        }).toThrow();
    });

    it('computeTemeToPseudoFixedMatrix throws without a date', function() {
        expect(function() {
            Transforms.computeTemeToPseudoFixedMatrix(undefined);
        }).toThrow();
    });

    it('pointToWindowCoordinates throws without modelViewProjectionMatrix', function() {
        expect(function() {
            Transforms.pointToWindowCoordinates(undefined, Matrix4.IDENTITY, Cartesian3.ZERO);
        }).toThrow();
    });

    it('pointToWindowCoordinates throws without viewportTransformation', function() {
        expect(function() {
            Transforms.pointToWindowCoordinates(Matrix4.IDENTITY, undefined, Cartesian3.ZERO);
        }).toThrow();
    });

    it('pointToWindowCoordinates throws without a point', function() {
        expect(function() {
            Transforms.pointToWindowCoordinates(Matrix4.IDENTITY, Matrix4.IDENTITY, undefined);
        }).toThrow();
    });
});