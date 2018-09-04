/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "c1d2276c6d88152fe0db";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./lib/index.js")(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! kabanery-lumine/lib/page/flowPfcSPA */ "./node_modules/kabanery-lumine/lib/page/flowPfcSPA.js"),
    SPA = _require.SPA;

var pageSignalActionMap = __webpack_require__(/*! ./pageSignalAction */ "./lib/pageSignalAction/index.js");
var pageViewMap = __webpack_require__(/*! ./pageView */ "./lib/pageView/index.js");

SPA({
  pageViewMap: pageViewMap,
  pageSignalActionMap: pageSignalActionMap,
  pageOptionsMap: {
    indexPage: {
      localStateStore: false,
      localStateStoreWhiteList: []
    }
  },
  defaultPage: 'indexPage'
});

/***/ }),

/***/ "./lib/pageSignalAction/index.js":
/*!***************************************!*\
  !*** ./lib/pageSignalAction/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * const {} = require('../signals');
 */

var _require = __webpack_require__(/*! kabanery-lumine/lib/flow/baseSignalActions */ "./node_modules/kabanery-lumine/lib/flow/baseSignalActions.js"),
    wrapBaseSignalActions = _require.wrapBaseSignalActions;

/**
 *
 * {
 *      [pageName]: {
 *          [signalName]: [{
 *              type,       // updateState | sendRequest
 *              content,    // tree-script
 *
 *              response,    // response of sendRequest, tree-script
 *              error,       // error of sendRequest, tree-script
 *              variableMap: {}
 *          }]
 *      }
 * }
 *
 * source tree data in tree-script
 *     updateState: {signal, viewState, localStorage}
 *     response: {response, viewState, localStorage}
 *     error: {errorMsg, error, viewState, localStorage}
 *
 * Special signals:
 *      kabanery_page_render // when this page rendered
 *
 * tree-script: https://github.com/LoveKino/tree-script
 */


module.exports = wrapBaseSignalActions({
  indexPage: {
    'kabanery_page_render': []
  }
});

/***/ }),

/***/ "./lib/pageView/index.js":
/*!*******************************!*\
  !*** ./lib/pageView/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *  register all pages here in the module
 */

var indexPage = __webpack_require__(/*! ./indexPage */ "./lib/pageView/indexPage.js");

module.exports = {
  indexPage: indexPage
};

/***/ }),

/***/ "./lib/pageView/indexPage.js":
/*!***********************************!*\
  !*** ./lib/pageView/indexPage.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SimplePager = __webpack_require__(/*! kabanery-lumine/lib/page/simplePager */ "./node_modules/kabanery-lumine/lib/page/simplePager.js");

var _require = __webpack_require__(/*! kabanery-lumine */ "./node_modules/kabanery-lumine/index.js"),
    lumineView = _require.lumineView,
    n = _require.n;

var FrameLink = __webpack_require__(/*! ../view/frameLink */ "./lib/view/frameLink.js");

/**
 * const {} = require('../signals');
 */

// common views
// const Hn = require('kabanery-lumine/lib/view/layout/hn');
// const Vn = require('kabanery-lumine/lib/view/layout/vn');
// const Button = require('kabanery-lumine/lib/view/button/button');
// const Input = require('kabanery-lumine/lib/view/input/input');

/**
 *  SimplePager encapsulate notice and loading view.
 *
 *      .notice.text
 *      .notice.show
 *      .loading.show
 */

/**
 * syncBindWithKeyMap:
 *     sync child props with parent props
 *     ctx.bn({[parent props]: 'value'})(Input, {})
 */

/**
 * pass signal
 *     demo: n(Button, {onsignal: ctx.pass('click', SIGNAL_TYPE)}, 'save')
 */
module.exports = SimplePager(lumineView(function (_ref, ctx) {
  var props = _ref.props;

  return n('div', {
    style: {
      padding: 8
    }
  }, [n('h2', 'plan'), n('ul', [n('li', 'Learn English (1 hour, suggested time: 13:30-14:30)'), n('li', 'Algorithm (1 hour, suggested time: 17:00-18:00)'), n('li', 'CASACN (1 hour, suggested time: 21:00-22:00)'), n('li', 'Health exercise (1 hour: 18:30-19:30)')]),

  // TODO
  n(FrameLink, {
    name: 'plan service. (TODO design a plan service)',
    url: ''
  }), n('h2', 'toolsites'), n('ul', [props.toolsites.map(function (tool) {
    // TODO fix fold problem
    return n('li', [n(FrameLink, {
      name: tool.name,
      url: tool.url,
      onUrlChange: function onUrlChange(url) {
        tool.url = url;
        ctx.update();
      }
    })]);
  })])]);
}, {
  defaultProps: {
    toolsites: [{
      name: 'youtube',
      url: 'https://www.youtube.com/'
    }, {
      name: 'netflix',
      url: 'https://www.netflix.com/browse'
    }, {
      name: 'facebook messager',
      url: 'https://www.messenger.com/t/kinolee97'
    }, {
      name: 'translator',
      url: 'https://translate.google.com/'
    }, {
      name: "scala api",
      url: 'https://www.scala-lang.org/files/archive/api/current/'
    }, {
      name: "nodejs doc",
      url: 'https://nodejs.org/dist/latest-v10.x/docs/api/'
    }, {
      name: 'MDN',
      url: 'https://developer.mozilla.org/en-US/'
    },

    // TODO some code compiler
    {
      name: 'js console',
      url: 'https://jsconsole.com/'
    }, {
      name: 'skype',
      url: 'https://web.skype.com/en/'
    }]
  }
}));

/***/ }),

/***/ "./lib/view/frameLink.js":
/*!*******************************!*\
  !*** ./lib/view/frameLink.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! kabanery-lumine */ "./node_modules/kabanery-lumine/index.js"),
    n = _require.n,
    lumineView = _require.lumineView;

var FrameWindow = __webpack_require__(/*! ./frameWindow */ "./lib/view/frameWindow.js");
var Fold = __webpack_require__(/*! kabanery-lumine/lib/view/fold/fold */ "./node_modules/kabanery-lumine/lib/view/fold/fold.js");
var Input = __webpack_require__(/*! kabanery-lumine/lib/view/input/input */ "./node_modules/kabanery-lumine/lib/view/input/input.js");

module.exports = lumineView(function (_ref, ctx) {
  var props = _ref.props;

  return n('div', {}, [n('strong', props.name), n('div', {
    style: {
      padding: '0 8 0 8'
    }
  }, [n(Fold, {
    hide: true
  }, [n('div', {
    style: {
      display: 'inline-block'
    }
  }, [n('span', 'inside frame'), n('a href="' + props.url + '" target="_blank"', {
    style: {
      display: 'inline-block',
      marginLeft: 10
    },
    onclick: function onclick(e) {
      e.preventDefault();
      e.stopPropagation();
      window.open(props.url, '_blank');
    }
  }, 'new page'), n('div style="display:inline-block"', {
    onclick: function onclick(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, [
  // TODO update bug
  ctx.bn({
    'url': 'value'
  }, {
    autoUpdate: true
  })(Input, {
    style: {
      width: 200
    }
  })])]), n('div', [n(FrameWindow, {
    src: props.url
  })])])])]);
}, {
  defaultProps: {
    name: '',
    url: ''
  }
});

/***/ }),

/***/ "./lib/view/frameWindow.js":
/*!*********************************!*\
  !*** ./lib/view/frameWindow.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! kabanery-lumine */ "./node_modules/kabanery-lumine/index.js"),
    n = _require.n,
    lumineView = _require.lumineView;

module.exports = lumineView(function (_ref) {
  var props = _ref.props;

  return n('iframe', {
    src: props.src,
    allow: props.allow,
    style: props.style
  });
}, {
  defaultProps: {
    allow: 'encrypted-media;camera;microphone;fullscreen;',
    style: {
      margin: 0,
      padding: 0,
      border: '1px solid #999999',
      width: '100%',
      height: 400
    }
  }
});

/***/ }),

/***/ "./node_modules/basetype/index.js":
/*!****************************************!*\
  !*** ./node_modules/basetype/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * basic types
 */

let truth = () => true;

let isUndefined = v => v === undefined;

let isNull = v => v === null;

let isFalsy = v => !v;

let likeArray = v => !!(v && typeof v === 'object' && typeof v.length === 'number' && v.length >= 0);

let isArray = v => Array.isArray(v);

let isString = v => typeof v === 'string';

let isObject = v => !!(v && typeof v === 'object');

let isFunction = v => typeof v === 'function';

let isNumber = v => typeof v === 'number' && !isNaN(v);

let isBool = v => typeof v === 'boolean';

let isNode = (o) => {
    return (
        typeof Node === 'object' ? o instanceof Node :
        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};

let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

let isRegExp = v => v instanceof RegExp;

let isReadableStream = (v) => isObject(v) && isFunction(v.on) && isFunction(v.pipe);

let isWritableStream = v => isObject(v) && isFunction(v.on) && isFunction(v.write);

/**
 * check type
 *
 * types = [typeFun]
 */
let funType = (fun, types = []) => {
    if (!isFunction(fun)) {
        throw new TypeError(typeErrorText(fun, 'function'));
    }

    if (!likeArray(types)) {
        throw new TypeError(typeErrorText(types, 'array'));
    }

    for (let i = 0; i < types.length; i++) {
        let typeFun = types[i];
        if (typeFun) {
            if (!isFunction(typeFun)) {
                throw new TypeError(typeErrorText(typeFun, 'function'));
            }
        }
    }

    return function() {
        // check type
        for (let i = 0; i < types.length; i++) {
            let typeFun = types[i];
            let arg = arguments[i];
            if (typeFun && !typeFun(arg)) {
                throw new TypeError(`Argument type error. Arguments order ${i}. Argument is ${arg}. function is ${fun}, args are ${arguments}.`);
            }
        }
        // result
        return fun.apply(this, arguments);
    };
};

let and = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }
    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (!typeFun(v)) {
                return false;
            }
        }
        return true;
    };
};

let or = (...args) => {
    if (!any(args, isFunction)) {
        throw new TypeError('The argument of and must be function.');
    }

    return (v) => {
        for (let i = 0; i < args.length; i++) {
            let typeFun = args[i];
            if (typeFun(v)) {
                return true;
            }
        }
        return false;
    };
};

let not = (type) => {
    if (!isFunction(type)) {
        throw new TypeError('The argument of and must be function.');
    }
    return (v) => !type(v);
};

let any = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(typeErrorText(list, 'list'));
    }
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    for (let i = 0; i < list.length; i++) {
        if (!type(list[i])) {
            return false;
        }
    }
    return true;
};

let exist = (list, type) => {
    if (!likeArray(list)) {
        throw new TypeError(typeErrorText(list, 'array'));
    }
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    for (let i = 0; i < list.length; i++) {
        if (type(list[i])) {
            return true;
        }
    }
    return false;
};

let mapType = (map) => {
    if (!isObject(map)) {
        throw new TypeError(typeErrorText(map, 'obj'));
    }

    for (let name in map) {
        let type = map[name];
        if (!isFunction(type)) {
            throw new TypeError(typeErrorText(type, 'function'));
        }
    }

    return (v) => {
        if (!isObject(v)) {
            return false;
        }

        for (let name in map) {
            let type = map[name];
            let attr = v[name];
            if (!type(attr)) {
                return false;
            }
        }

        return true;
    };
};

let listType = (type) => {
    if (!isFunction(type)) {
        throw new TypeError(typeErrorText(type, 'function'));
    }

    return (list) => any(list, type);
};

let typeErrorText = (v, expect) => {
    return `Expect ${expect} type, but got type ${typeof v}, and value is ${v}`;
};

module.exports = {
    isArray,
    likeArray,
    isString,
    isObject,
    isFunction,
    isNumber,
    isBool,
    isNode,
    isPromise,
    isNull,
    isUndefined,
    isFalsy,
    isRegExp,
    isReadableStream,
    isWritableStream,

    funType,
    any,
    exist,

    and,
    or,
    not,
    mapType,
    listType,
    truth
};


/***/ }),

/***/ "./node_modules/cl-fsm/apply/json/index.js":
/*!*************************************************!*\
  !*** ./node_modules/cl-fsm/apply/json/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    stateGraphDSL
} = __webpack_require__(/*! ../.. */ "./node_modules/cl-fsm/index.js");

let {
    g, c, union, range, sequence, circle, left, repeat
} = stateGraphDSL;

let numberGraph = g(c(union(null, '-'),
    g(
        c('0', g('decimal',
            c('.', circle(range('0', '9'), 'science')),
            c(null, g('science',
                c(null, 'accept'),
                sequence(
                    union('e', 'E'),
                    union('+', '-', null),
                    range('0', '9'),
                    circle(range('0', '9'), 'accept')
                )
            ))
        )),

        sequence(
            range('1', '9'),
            circle(range('0', '9'), 'decimal')
        )
    )
));

let hexDigit = union(range('0', '9'), range('A', 'F'), range('a', 'f'));

let escapeSymbols = union('"', '\\', '\/', 'b', 'f', 'n', 'r', 't');

let stringGraph = g(
    c('"', g('enter',
        c('\\', g(
            c(escapeSymbols, 'enter'),
            c('u',
                g(repeat(hexDigit, 4, 'enter'))
            ))),
        c('"', 'accept'),
        c(left(), 'enter')
    )));

module.exports = {
    numberGraph,
    stringGraph
};


/***/ }),

/***/ "./node_modules/cl-fsm/index.js":
/*!**************************************!*\
  !*** ./node_modules/cl-fsm/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *
 * @readme-quick-run
 *
 * ## test tar=js r_c=FSM
 *
 *
 * let {
 *     stateGraphDSL, fsm, WAIT, MATCH
 * } = FSM;
 *
 * let {
 *     g, c, union, range, sequence, circle, left, repeat
 * } = stateGraphDSL;
 *
 * let hexDigit = union(range('0', '9'), range('A', 'F'), range('a', 'f'));
 *
 * let escapeSymbols = union('"', '\\', '\/', 'b', 'f', 'n', 'r', 't');
 *
 * let stringDFA = g(
 *     c('"', g('enter',
 *         c('\\', g(
 *             c(escapeSymbols, 'enter'),
 *             c('u',
 *                 g(repeat(hexDigit, 4, 'enter'))
 *             ))),
 *         c('"', 'accept'),
 *         c(left(), 'enter')
 *     )));
 *
 * let m = fsm(stringDFA);
 * console.log(m('"').type === WAIT);
 * console.log(m('a').type === WAIT);
 * console.log(m('b').type === WAIT);
 * console.log(m('"').type === MATCH);
 *
 **/
module.exports = __webpack_require__(/*! ./src */ "./node_modules/cl-fsm/src/index.js");


/***/ }),

/***/ "./node_modules/cl-fsm/node_modules/bolzano/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/cl-fsm/node_modules/bolzano/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject, funType, or, isString, isFalsy, likeArray
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let iterate = __webpack_require__(/*! ./lib/iterate */ "./node_modules/cl-fsm/node_modules/bolzano/lib/iterate.js");

let {
    map, reduce, find, findIndex, forEach, filter, any, exist, compact, reverse, overArgs
} = __webpack_require__(/*! ./lib/fp */ "./node_modules/cl-fsm/node_modules/bolzano/lib/fp.js");

let contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;

let difference = (list1, list2, fopts) => {
    return reduce(list1, (prev, item) => {
        if (!contain(list2, item, fopts) &&
            !contain(prev, item, fopts)) {
            prev.push(item);
        }
        return prev;
    }, []);
};

let union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));

let mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));

let setValueKey = (obj, value, key) => {
    obj[key] = value;
    return obj;
};

let interset = (list1, list2, fopts) => {
    return reduce(list1, (prev, cur) => {
        if (contain(list2, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, []);
};

let deRepeat = (list, fopts, init = []) => {
    return reduce(list, (prev, cur) => {
        if (!contain(prev, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, init);
};

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let flat = (list) => {
    if (likeArray(list) && !isString(list)) {
        return reduce(list, (prev, item) => {
            prev = prev.concat(flat(item));
            return prev;
        }, []);
    } else {
        return [list];
    }
};

module.exports = {
    flat,
    contain,
    difference,
    union,
    interset,
    map,
    reduce,
    iterate,
    find,
    findIndex,
    deRepeat,
    forEach,
    filter,
    any,
    exist,
    get,
    delay,
    mergeMap,
    compact,
    reverse,
    overArgs
};


/***/ }),

/***/ "./node_modules/cl-fsm/node_modules/bolzano/lib/fp.js":
/*!************************************************************!*\
  !*** ./node_modules/cl-fsm/node_modules/bolzano/lib/fp.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    iterate
} = __webpack_require__(/*! ./iterate */ "./node_modules/cl-fsm/node_modules/bolzano/lib/iterate.js");

let {
    isFunction
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let defauls = {
    eq: (v1, v2) => v1 === v2
};

let setDefault = (opts, defauls) => {
    for (let name in defauls) {
        opts[name] = opts[name] || defauls[name];
    }
};

let forEach = (list, handler) => iterate(list, {
    limit: (rets) => {
        if (rets === true) return true;
        return false;
    },
    transfer: handler,
    output: (prev, cur) => cur,
    def: false
});

let map = (list, handler, limit) => iterate(list, {
    transfer: handler,
    def: [],
    limit
});

let reduce = (list, handler, def, limit) => iterate(list, {
    output: handler,
    def,
    limit
});

let filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {
    handler && handler(cur, index, list) && prev.push(cur);
    return prev;
}, [], limit);

let find = (list, item, fopts) => {
    let index = findIndex(list, item, fopts);
    if (index === -1) return undefined;
    return list[index];
};

let any = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev && originLogic(curLogic);
}, true, falsyIt);

let exist = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev || originLogic(curLogic);
}, false, originLogic);

let findIndex = (list, item, fopts = {}) => {
    setDefault(fopts, defauls);

    let {
        eq
    } = fopts;
    let predicate = isFunction(item) ? item : (v) => eq(item, v);
    let ret = iterate(list, {
        transfer: indexTransfer,
        limit: onlyOne,
        predicate,
        def: []
    });
    if (!ret.length) return -1;
    return ret[0];
};

let compact = (list) => reduce(list, (prev, cur) => {
    if (cur) prev.push(cur);
    return prev;
}, []);

let reverse = (list) => reduce(list, (prev, cur) => {
    prev.unshift(cur);
    return prev;
}, []);

let indexTransfer = (item, index) => index;

let onlyOne = (rets, item, name, domain, count) => count >= 1;

let falsyIt = v => !v;

let originLogic = v => !!v;

let overArgs = (func, transform) => {
    return (...args) => {
        let newArgs = transform(...args);
        return func(...newArgs);
    };
};

module.exports = {
    overArgs,
    map,
    forEach,
    reduce,
    find,
    findIndex,
    filter,
    any,
    exist,
    compact,
    reverse
};


/***/ }),

/***/ "./node_modules/cl-fsm/node_modules/bolzano/lib/iterate.js":
/*!*****************************************************************!*\
  !*** ./node_modules/cl-fsm/node_modules/bolzano/lib/iterate.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isPromise, likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, isReadableStream, mapType
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

/**
 * @param opts
 *      preidcate: chose items to iterate
 *      limit: when to stop iteration
 *      transfer: transfer item
 *      output
 *      def: default result
 */
let iterate = funType((domain, opts = {}) => {
    domain = domain || [];
    if (isPromise(domain)) {
        return domain.then(list => {
            return iterate(list, opts);
        });
    }
    return iterateList(domain, opts);
}, [
    or(isPromise, isObject, isFunction, isFalsy),
    or(isUndefined, mapType({
        predicate: or(isFunction, isFalsy),
        transfer: or(isFunction, isFalsy),
        output: or(isFunction, isFalsy),
        limit: or(isUndefined, isNumber, isFunction)
    }))
]);

let iterateList = (domain, opts) => {
    opts = initOpts(opts, domain);

    let rets = opts.def;
    let count = 0; // iteration times

    if (isReadableStream(domain)) {
        let index = -1;

        return new Promise((resolve, reject) => {
            domain.on('data', (chunk) => {
                // TODO try cache error
                let itemRet = iterateItem(chunk, domain, ++index, count, rets, opts);
                rets = itemRet.rets;
                count = itemRet.count;
                if (itemRet.stop) {
                    resolve(rets);
                }
            });
            domain.on('end', () => {
                resolve(rets);
            });
            domain.on('error', (err) => {
                reject(err);
            });
        });
    } else if (likeArray(domain)) {
        for (let i = 0; i < domain.length; i++) {
            let item = domain[i];
            let itemRet = iterateItem(item, domain, i, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    } else if (isObject(domain)) {
        for (let name in domain) {
            let item = domain[name];
            let itemRet = iterateItem(item, domain, name, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    }

    return rets;
};

let initOpts = (opts, domain) => {
    let {
        predicate, transfer, output, limit
    } = opts;

    opts.predicate = predicate || truthy;
    opts.transfer = transfer || id;
    opts.output = output || toList;
    if (limit === undefined) limit = domain && domain.length;
    limit = opts.limit = stopCondition(limit);
    return opts;
};

let iterateItem = (item, domain, name, count, rets, {
    predicate, transfer, output, limit
}) => {
    if (limit(rets, item, name, domain, count)) {
        // stop
        return {
            stop: true,
            count,
            rets
        };
    }

    if (predicate(item)) {
        rets = output(rets, transfer(item, name, domain, rets), name, domain);
        count++;
    }
    return {
        stop: false,
        count,
        rets
    };
};

let stopCondition = (limit) => {
    if (isUndefined(limit)) {
        return falsy;
    } else if (isNumber(limit)) {
        return (rets, item, name, domain, count) => count >= limit;
    } else {
        return limit;
    }
};

let toList = (prev, v) => {
    prev.push(v);
    return prev;
};

let truthy = () => true;

let falsy = () => false;

let id = v => v;

module.exports = {
    iterate
};


/***/ }),

/***/ "./node_modules/cl-fsm/src/const.js":
/*!******************************************!*\
  !*** ./node_modules/cl-fsm/src/const.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    WAIT: 2,
    MATCH: 1,
    QUIT: 0
};


/***/ }),

/***/ "./node_modules/cl-fsm/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/cl-fsm/src/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    QUIT, WAIT, MATCH
} = __webpack_require__(/*! ./const */ "./node_modules/cl-fsm/src/const.js");

let stateGraphDSL = __webpack_require__(/*! ./stateGraphDSL */ "./node_modules/cl-fsm/src/stateGraphDSL/index.js");

const START_STATE = '__start__state__';

let fsm = (stateMap) => {
    // parse stateMap
    let {
        transitions, acceptStateMap
    } = stateGraphDSL.transitionMaper(
        stateGraphDSL.g(START_STATE,
            stateGraphDSL.c(null, stateMap)));

    let dfa = new DFA(transitions, acceptStateMap);

    // matching function
    return (letter) => {
        return dfa.transit(letter);
    };
};

let DFA = function(stateMap, acceptStateMap) {
    this.currentState = START_STATE;
    this.stateMap = stateMap;
    this.acceptStateMap = acceptStateMap;
};

let proto = DFA.prototype;

proto.transit = function(letter) {
    let subMap = this.stateMap[this.currentState];
    if (!subMap) return {
        type: QUIT,
        state: this.currentState
    };

    // transit to target state
    let targetState = subMap(letter);

    if (stateGraphDSL.isEpsilonTransition(targetState)) {
        this.currentState = targetState.state; // epsilon transition
        return this.transit(letter);
    }

    if (targetState === undefined) {
        return {
            type: QUIT,
            state: this.currentState
        };
    }

    this.currentState = targetState;
    if (this.acceptStateMap[targetState]) return {
        type: MATCH,
        state: this.currentState
    };

    return {
        type: WAIT,
        state: this.currentState
    };
};

module.exports = {
    fsm,
    stateGraphDSL,
    DFA,
    QUIT,
    WAIT,
    MATCH
};


/***/ }),

/***/ "./node_modules/cl-fsm/src/stateGraphDSL/actionDSL.js":
/*!************************************************************!*\
  !*** ./node_modules/cl-fsm/src/stateGraphDSL/actionDSL.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

/**
 * basic action types and compose actions
 *
 * action = {
 *   actionType
 * }
 */

const __basic_action_type__ = '7e942534-ea8b-4c75-90fd-705aec328d00';

const LEFT_TYPE = 'left',
    RANGE_TYPE = 'range',
    UNION_TYPE = 'union',
    NORMAL_TYPE = 'normal',
    EPSILON_TYPE = 'epsilon';

let toAction = (v) => {
    if (isAction(v)) return v;
    if (v === null) return {
        content: v,
        actionType: EPSILON_TYPE,
        __basic_action_type__

    };
    return {
        content: v,
        actionType: NORMAL_TYPE,
        __basic_action_type__
    };
};

let left = () => {
    return {
        actionType: LEFT_TYPE,
        __basic_action_type__
    };
};

let range = (start, end) => {
    return {
        actionType: RANGE_TYPE,
        start,
        end,
        __basic_action_type__
    };
};

// union two actions to get a new action
let union = (...actions) => {
    for (let i = 0; i < actions.length; i++) {
        let action = actions[i];
        if (!isAction(action)) {
            actions[i] = toAction(action);
        }
    }

    return {
        actionType: UNION_TYPE,
        actions,
        __basic_action_type__
    };
};

let isAction = (v) => {
    return isObject(v) && v.__basic_action_type__ === __basic_action_type__;
};

let isLeftAction = (v) => isAction(v) && v.actionType === LEFT_TYPE;

let isRangeAction = (v) => isAction(v) && v.actionType === RANGE_TYPE;

let isUnionAction = (v) => isAction(v) && v.actionType === UNION_TYPE;

let isNormalAction = (v) => isAction(v) && v.actionType === NORMAL_TYPE;

let isEpsilonAction = (v) => isAction(v) && v.actionType === EPSILON_TYPE;

module.exports = {
    isAction,
    isLeftAction,
    isRangeAction,
    isUnionAction,
    isNormalAction,
    isEpsilonAction,

    left,
    range,
    toAction,
    union
};


/***/ }),

/***/ "./node_modules/cl-fsm/src/stateGraphDSL/graphDSL.js":
/*!***********************************************************!*\
  !*** ./node_modules/cl-fsm/src/stateGraphDSL/graphDSL.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isString, isObject
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let actionDSL = __webpack_require__(/*! ./actionDSL */ "./node_modules/cl-fsm/src/stateGraphDSL/actionDSL.js");

let {
    toAction
} = actionDSL;

let {
    mergeMap
} = __webpack_require__(/*! bolzano */ "./node_modules/cl-fsm/node_modules/bolzano/index.js");

/**
 * graph definition DSL
 *
 * state    action
 *
 * transition: (startState, action, nextState)
 *
 */

/**
 * graph(s1,
 *     connect(a1, graph(s2,
 *         connect(a3, s4),
 *         connect(a4, s5)
 *     )),
 *
 *     connect(a2, s3)
 *  )
 */

let count = 0;
let autoGraphState = () => {
    return `__auto_state_name_${count++}`;
};

/**
 * graph data = {
 *    transitions: [
 *      [action, nextGraph]
 *    ],
 *    state
 * }
 */
let graph = (...args) => {
    let state = null,
        lines = null;

    if (isString(args[0])) {
        state = args[0];
        lines = args.slice(1);
    } else {
        state = autoGraphState();
        lines = args;
    }

    let transitionMap = {};

    transitionMap[state] = [];

    for (let i = 0; i < lines.length; i++) {
        let {
            action, nextGraph
        } = lines[i];

        let nextState = isString(nextGraph) ? nextGraph : nextGraph.state;

        transitionMap[state].push({
            action,
            state: nextState
        });

        // merge transitionMap
        for (let name in nextGraph.transitionMap) {
            if (transitionMap[name]) {
                throw new Error(`repeated state name for different state, name is ${name}`);
            }
            transitionMap[name] = nextGraph.transitionMap[name];
        }
    }

    return {
        state,
        transitionMap
    };
};

let connect = (action, nextGraph) => {
    action = toAction(action);
    if(!nextGraph) nextGraph = autoGraphState();
    return {
        action,
        nextGraph
    };
};

/**
 * circle: repeat at least 0 times
 */
let circle = (action, nextGraph) => {
    let stateName = autoGraphState();

    return graph(stateName,
        connect(action, stateName),
        connect(null, nextGraph)
    );
};

let repeat = (action, times, nextGraph) => {
    let args = [];
    for (let i = 0; i < times; i++) {
        args.push(action);
    }
    args.push(nextGraph);

    return sequence(...args);
};

let sequence = (...args) => {
    let actions = args.slice(0, -1);
    let nextGraph = args[args.length - 1];
    let action = actions[0];
    if (actions.length <= 1) {
        return connect(action, nextGraph);
    }

    let nexts = actions.slice(1).concat([nextGraph]);

    return connect(action, graph(sequence(...nexts)));
};

let isEpsilonTransition = (v) => {
    return isObject(v) && v.type === 'deliver';
};

module.exports = mergeMap(actionDSL, {
    graph,
    connect,

    repeat,
    sequence,

    circle,

    isEpsilonTransition
});


/***/ }),

/***/ "./node_modules/cl-fsm/src/stateGraphDSL/index.js":
/*!********************************************************!*\
  !*** ./node_modules/cl-fsm/src/stateGraphDSL/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let actionDSL = __webpack_require__(/*! ./actionDSL */ "./node_modules/cl-fsm/src/stateGraphDSL/actionDSL.js");

let {
    isNormalAction, isRangeAction, isUnionAction, isLeftAction, isEpsilonAction
} = actionDSL;

let {
    graph,
    connect,

    repeat,
    sequence,

    circle,

    isEpsilonTransition
} = __webpack_require__(/*! ./graphDSL */ "./node_modules/cl-fsm/src/stateGraphDSL/graphDSL.js");

let {
    mergeMap
} = __webpack_require__(/*! bolzano */ "./node_modules/cl-fsm/node_modules/bolzano/index.js");

let transitionMaper = (graph) => {
    let transitions = {};
    let {
        transitionMap
    } = graph;

    let accepts = getEndStates(graph);

    let leftMap = getLeftActionMap(transitionMap);
    let epsilonMap = getEpsilonActionMap(transitionMap);

    for (let stateName in transitionMap) {
        let transitList = transitionMap[stateName];

        transitions[stateName] = (letter) => {
            for (let i = transitList.length - 1; i >= 0; i--) {
                let {
                    state, action
                } = transitList[i];

                if (matchAction(action, letter)) return state;
            }

            // check rest
            if (leftMap[stateName]) return leftMap[stateName];

            if (epsilonMap[stateName]) {
                return {
                    type: 'deliver',
                    state: epsilonMap[stateName]
                };
            }
        };
    }

    return {
        transitions,
        acceptStateMap: getAcceptStateMap(epsilonMap, accepts)
    };
};

/**
 * a end state's out-degree = 0
 */
let getEndStates = (graph) => {
    let outDegreeMap = getOutDegreeMap(graph);
    let ends = [];
    for (let name in outDegreeMap) {
        if (outDegreeMap[name] === 0) {
            ends.push(name);
        }
    }

    return ends;
};

let getOutDegreeMap = (graph) => {
    let outDegreeMap = {};
    let {
        transitionMap
    } = graph;
    for (let stateName in transitionMap) {
        let transitList = transitionMap[stateName];
        outDegreeMap[stateName] = transitList.length;
        for (let i = 0; i < transitList.length; i++) {
            let {
                state
            } = transitList[i];
            outDegreeMap[state] = outDegreeMap[state] || 0;
        }
    }

    return outDegreeMap;
};

/**
 * epsilon chain
 */
let getAcceptStateMap = (epsilonMap, accepts) => {
    let acceptStateMap = {};

    let reverseEpsilonMap = {};
    for (let name in epsilonMap) {
        let tar = epsilonMap[name];
        reverseEpsilonMap[tar] = reverseEpsilonMap[tar] || [];
        reverseEpsilonMap[tar].push(name);
    }

    for (let i = 0; i < accepts.length; i++) {
        let accept = accepts[i];
        acceptStateMap[accept] = true;
    }

    let count = 0;

    while (true) { // eslint-disable-line
        let prevCount = count;

        for (let name in acceptStateMap) {
            let list = reverseEpsilonMap[name];
            if (list) {
                for (let j = 0; j < list.length; j++) {
                    if (!acceptStateMap[list[j]]) {
                        acceptStateMap[list[j]] = true;
                        count++;
                    }
                }
            }
        }

        if (count === prevCount) { // no more
            break;
        }
    }

    return acceptStateMap;
};

let matchAction = (action, letter) => {
    if (isNormalAction(action) && action.content === letter) return true;
    if (isRangeAction(action) && action.start <= letter && letter <= action.end) return true;
    if (isUnionAction(action)) {
        let {
            actions
        } = action;

        for (let i = 0; i < actions.length; i++) {
            if (matchAction(actions[i], letter)) return true;
        }
    }

    return false;
};

let getEpsilonActionMap = (transitionMap) => {
    let map = {};

    for (let stateName in transitionMap) {
        let transitList = transitionMap[stateName];
        let tarState = findActionState(transitList, isEpsilonAction);
        if (tarState) {
            map[stateName] = tarState;
        }
    }

    return map;
};

let getLeftActionMap = (transitionMap) => {
    let map = {};
    for (let stateName in transitionMap) {
        let transitList = transitionMap[stateName];
        let tarState = findActionState(transitList, isLeftAction);
        if (tarState) {
            map[stateName] = tarState;
        }
    }
    return map;
};

let findActionState = (transitList, type) => {
    for (let i = transitList.length - 1; i >= 0; i--) {
        let {
            action, state
        } = transitList[i];
        if (containActionType(action, type)) {
            return state;
        }
    }
};

let containActionType = (action, type) => {
    if (isUnionAction(action)) {
        let {
            actions
        } = action;

        for (let i = 0; i < actions.length; i++) {
            if (containActionType(actions[i], type)) return true;
        }
    } else {
        return type(action);
    }

    return false;
};

module.exports = mergeMap(actionDSL, {
    graph,
    connect,

    transitionMaper,
    repeat,
    sequence,

    circle,

    isEpsilonTransition,

    g: graph, c: connect
});


/***/ }),

/***/ "./node_modules/doming/index.js":
/*!**************************************!*\
  !*** ./node_modules/doming/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let shadowFrame = __webpack_require__(/*! ./lib/shadowFrame */ "./node_modules/doming/lib/shadowFrame.js");

let startMomenter = __webpack_require__(/*! ./lib/startMomenter.js */ "./node_modules/doming/lib/startMomenter.js");

let getX = (elem) => {
    var x = 0;
    while (elem) {
        x = x + elem.offsetLeft;
        elem = elem.offsetParent;
    }
    return x;
};

let getY = (elem) => {
    var y = 0;
    while (elem) {
        y = y + elem.offsetTop;
        elem = elem.offsetParent;
    }
    return y;
};

let getClientX = (elem) => {
    return getX(elem) - window.scrollX;
};

let getClientY = (elem) => {
    return getY(elem) - window.scrollY;
};

let removeChilds = (node) => {
    while (node && node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

let once = (node, type, handler, useCapture) => {
    let fun = function(e) {
        let ret = handler.apply(this, [e]);
        node.removeEventListener(type, fun, useCapture);
        return ret;
    };

    node.addEventListener(type, fun, useCapture);
};

let getAttributeMap = (attributes = []) => {
    let map = {};
    for (let i = 0; i < attributes.length; i++) {
        let {
            name, value
        } = attributes[i];
        map[name] = value;
    }
    return map;
};

let getClasses = (clz = '') => {
    let ret = [];
    let items = clz.split(' ');
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        item = item.trim();
        if (item) {
            ret.push(item);
        }
    }
    return ret;
};

module.exports = {
    getX,
    getY,
    getClientX,
    getClientY,
    removeChilds,
    once,
    shadowFrame,
    getAttributeMap,
    startMomenter,
    getClasses
};


/***/ }),

/***/ "./node_modules/doming/lib/shadowFrame.js":
/*!************************************************!*\
  !*** ./node_modules/doming/lib/shadowFrame.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let shadowFrame = () => {
    let div = document.createElement('div');
    let sr = div.createShadowRoot();
    sr.innerHTML = '<div id="shadow-page"></div>';

    let frame = null;

    let create = () => {
        let html = document.getElementsByTagName('html')[0];
        html.appendChild(div);

        return sr.getElementById('shadow-page');
    };

    let start = () => {
        if (frame) {
            return frame;
        }
        frame = new Promise(resolve => {
            if (document.body) {
                resolve(create());
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    resolve(create());
                });
            }
        });
        return frame;
    };

    let close = () => {
        frame.then(() => {
            let parent = div.parentNode;
            parent && parent.removeChild(div);
        });
    };

    return {
        start,
        close,
        sr,
        rootDiv: div
    };
};

module.exports = shadowFrame;


/***/ }),

/***/ "./node_modules/doming/lib/startMomenter.js":
/*!**************************************************!*\
  !*** ./node_modules/doming/lib/startMomenter.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let isDomReady = (doc) => doc.readyState === 'complete' ||
    (!doc.attachEvent && doc.readyState === 'interactive');

let startMomenter = (doc = document) => {
    let loadedFlag = false;

    let resolves = [];

    let docReady = () => {
        let ready = () => {
            if (loadedFlag) return;
            loadedFlag = true;
            for (let i = 0; i < resolves.length; i++) {
                resolves[i]();
            }
            resolves = [];
        };
        if (doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', ready);
            doc.addEventListener('DOMContentLoaded', ready);
        } else {
            doc.attachEvent('onreadystatechange', () => {
                if (document.readyState === 'complete') {
                    ready();
                }
            });
        }
    };

    docReady();

    // generalWaitTime is used for async rendering
    return ({
        generalWaitTime = 0, startTimeout = 10000
    } = {}) => new Promise((resolve, reject) => {
        if (loadedFlag || isDomReady(doc)) { // already ready
            setTimeout(resolve, generalWaitTime);
        } else { // wait for ready
            resolves.push(resolve);
            setTimeout(() => {
                reject(new Error('timeout'));
            }, startTimeout);
        }
    });
};

module.exports = startMomenter;


/***/ }),

/***/ "./node_modules/kabanery-lumine/index.js":
/*!***********************************************!*\
  !*** ./node_modules/kabanery-lumine/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @readme-doc
 *
 * ## features
 *
 *  Front end framework, which provides:
 *
 *   - View definition DSL, data & view auto binding
 *
 *   - Signal Handler DSL, Request DSL
 *
 *     signal system
 *
 *     simple DSL to update page
 *
 *     simple DSL to request and response data
 *
 *   - common views
 *
 *   - theme system
 *
 *   - skelton tools
 *
 *   - other tools
 *
 * ## document site
 *
 *  [http://lovekino.github.io/project/kabanery-lumine/index.html](http://lovekino.github.io/project/kabanery-lumine/index.html)
 *
 */

module.exports = __webpack_require__(/*! ./lib */ "./node_modules/kabanery-lumine/lib/index.js");


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/flow/baseSignalActions.js":
/*!********************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/flow/baseSignalActions.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const KABANERY_DO_RENDER = 'kabanery_do_render';

const baseSignalActionMap = {
  [KABANERY_DO_RENDER]: [{
    type: 'updateState',
    content: ''
  }]
};

let wrapBaseSignalActions = (signalActionMap) => {
  for (let name in signalActionMap) {
    let pageSignalActionMap = signalActionMap[name];

    for (let cname in baseSignalActionMap) {
      if (!pageSignalActionMap[cname]) {
        pageSignalActionMap[cname] = baseSignalActionMap[cname];
      }
    }
  }

  return signalActionMap;
};

module.exports = {
  KABANERY_DO_RENDER,
  wrapBaseSignalActions
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const lumineView = __webpack_require__(/*! ./util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");
const n = __webpack_require__(/*! ./util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");
const {mount} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");
const {Signal, onSignalType, deliver} = __webpack_require__(/*! lumine-signal */ "./node_modules/lumine-signal/index.js");

module.exports = {
  lumineView,
  n,
  mount,
  Signal,
  onSignalType,
  deliver
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/page/flowPfcSPA.js":
/*!*************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/page/flowPfcSPA.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  router,
  queryPager
} = __webpack_require__(/*! kabanery-spa */ "./node_modules/kabanery-spa/index.js");
const {
  mount
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");
const n = __webpack_require__(/*! ../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");
const pfcApis = __webpack_require__(/*! ../request/pfcApis */ "./node_modules/kabanery-lumine/lib/request/pfcApis.js");
const {
  signalActionFlow
} = __webpack_require__(/*! kabanery-signal-flow */ "./node_modules/kabanery-signal-flow/index.js");
const {
  Signal
} = __webpack_require__(/*! lumine-signal */ "./node_modules/lumine-signal/index.js");
const {
  wrapPagePropsWithStore
} = __webpack_require__(/*! ../store/storeProps */ "./node_modules/kabanery-lumine/lib/store/storeProps.js");

const PAGE_RENDER_SIGNAL = 'kabanery_page_render';

const SPA = ({
  // fo pfc apis
  apiPath = '/api/pfc',
  apiStub = {},

  runApi,
  apiMap,

  containerId = 'pager',

  // page configs
  pageViewMap = {},
  pageSignalActionMap = {},
  pageOptionsMap = {},

  // variabel map for page signal action
  signalVariableMap,
  signalVariableStub,
  signalOnError,

  defaultPage,
  pagerContainer // default document.body
}) => {
  let pageEnv = {};

  if (runApi) {
    pageEnv.runApi = runApi;
    pageEnv.apiMap = apiMap;
  } else { // default usage
    // TODO validate params
    let apier = pfcApis(apiPath, apiStub);
    pageEnv.runApi = apier.runApi;
    pageEnv.apiMap = apier.apiMap;
  }

  // create page map
  let pageMap = {};
  let currentCtx = {};

  for (let name in pageViewMap) {
    let pageOptions = pageOptionsMap[name] || {};
    let PageView = pageViewMap[name];
    let signalActionMap = pageSignalActionMap[name] || {};
    pageMap[name] = {
      title: pageOptions.title || name,
      render: (pageEnv) => {
        let pageView = page(pageEnv, PageView, signalActionMap, pageOptions, {
          variableMap: signalVariableMap,
          variableStub: signalVariableStub,
          onError: signalOnError
        });

        currentCtx = pageView.ctx;
        return pageView;
      }
    };
  }

  mount(n(`div id="${containerId}"`), pagerContainer || document.body); // pager as container

  let {
    forward,
    redirect,
    reload
  } = router(
    // pages
    queryPager(pageMap, defaultPage || Object.keys(pageMap)[0]),

    // page env
    pageEnv,

    {
      containerId
    });

  pageEnv.forward = forward;
  pageEnv.redirect = redirect;
  pageEnv.reload = reload;

  forward(window.location.href);

  return {
    getCurrentPageCtx: () => {
      return currentCtx;
    },

    getPageEnv: () => {
      return pageEnv;
    }
  };
};

const page = (pageEnv, PageView, signalActionMap, {
  localStateStore = false,
  localStateStoreWhiteList = []
} = {}, {
  variableMap,
  variableStub,
  onError
} = {}) => {
  let props = {
    onsignal: signalActionFlow(signalActionMap, pageEnv, {
      variableMap,
      variableStub,
      onError
    })
  };

  if (localStateStore) {
    props = wrapPagePropsWithStore(props, {
      whiteList: localStateStoreWhiteList
    });
  }

  let pageView = n(PageView, props);

  pageView.ctx.notify(Signal(PAGE_RENDER_SIGNAL));

  return pageView;
};

module.exports = {
  SPA,
  page
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/page/simplePager.js":
/*!**************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/page/simplePager.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const lumineView = __webpack_require__(/*! ../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");
const n = __webpack_require__(/*! ../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");
const PageLoading = __webpack_require__(/*! ../view/loading/pageLoading */ "./node_modules/kabanery-lumine/lib/view/loading/pageLoading.js");
const Notice = __webpack_require__(/*! ../view/notice/notice */ "./node_modules/kabanery-lumine/lib/view/notice/notice.js");
const {
  syncBindWithKeyMap
} = __webpack_require__(/*! ../util/compose */ "./node_modules/kabanery-lumine/lib/util/compose.js");
const Full = __webpack_require__(/*! ../view/layout/full */ "./node_modules/kabanery-lumine/lib/view/layout/full.js");

/**
 *
 * define a simple page view class, which contains page loading and notice.
 */

module.exports = (PageView) => {
  return lumineView((state, ctx) => {
    const oldOnSignal = state.props.onsignal;

    state.props.onsignal = (signal, viewState) => {
      // sync state
      state.props = viewState.props;
      state.children = viewState.children;

      oldOnSignal && oldOnSignal(signal, state, ctx);
    };

    return n(Full, {
      style: state.props.style.container
    }, [
      n(PageLoading,
        syncBindWithKeyMap(ctx, {
          'loading.show': 'show'
        }, {
          bindedProps: {
            style: state.props.style.loading
          }
        })),

      n(Notice, syncBindWithKeyMap(
        ctx, {
          'notice.show': 'show',
          'notice.text': 'text'
        }, {
          bindedProps: {
            style: state.props.style.notice
          }
        })),

      n(PageView, state.props, state.children)
    ]);
  }, {
    defaultProps: {
      // loading in page level
      loading: {
        show: false
      },
      // notice window
      notice: {
        show: false,
        text: ''
      },

      style: {
        container: {},
        loading: {
          zIndex: 10000
        },
        notice: {}
      }
    }
  });
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/request/pfcApis.js":
/*!*************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/request/pfcApis.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let stubAsApis = __webpack_require__(/*! pfc-compiler/lib/stubAsApis */ "./node_modules/pfc-compiler/lib/stubAsApis.js");
let pfcRequestor = __webpack_require__(/*! ./pfcRequestor */ "./node_modules/kabanery-lumine/lib/request/pfcRequestor.js");

module.exports = (apiPath, stub) => {
  let pfcRequest = pfcRequestor(apiPath);
  let apis = stubAsApis(stub);

  let apiMap = {};

  for (let name in apis) {
    let api = apis[name];
    if (typeof api === 'function') {
      apiMap[name] = (...params) => {
        let lazy = () => {
          // resolve params first
          let paramValues = [];
          for (let i = 0; i < params.length; i++) {
            let param = params[i];
            if (isLazyFun(param)) {
              paramValues.push(param());
            } else {
              paramValues.push(param);
            }
          }

          return api(...paramValues);
        };

        lazy.tag = 'lazy';

        return lazy;
      };
    } else {
      apiMap[name] = api;
    }
  }

  let runApi = (exp) => {
    try {
      if (isLazyFun(exp)) {
        exp = exp();
      }
      return pfcRequest(exp.code);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    apiMap,
    runApi
  };
};

let isLazyFun = (f) => {
  return typeof f === 'function' && f.tag === 'lazy';
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/request/pfcRequestor.js":
/*!******************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/request/pfcRequestor.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let requestor = (apiPath = '/api/pfc') => (pfcCode) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let {
            errno,
            errMsg,
            data
          } = JSON.parse(xhr.responseText);
          if (errno === 0) {
            resolve(data);
          } else {
            reject(new Error((errMsg.split(':')[1] || '').trim()));
          }
        } else {
          reject(new Error(`status code is ${xhr.status}`));
        }
      }
    };

    xhr.open('post', apiPath);
    xhr.send(pfcCode);
  });
};

module.exports = requestor;


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/store/storeProps.js":
/*!**************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/store/storeProps.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

let helper = __webpack_require__(/*! ../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

// TODO opt performance
// TODO avoid save theme
// TODO expire time

let pagePropsStore = (options = {}) => {
  let {version = 1.0} = options;

  let key = options.key || getDefaultKey(options);

  let set = (props) => {
    let attributes = options.whiteList || [];

    localStorage[key] = JSON.stringify({
      version,
      props : attributes.reduce(
        (prev, attribute) => {
          helper.set(prev, attribute, helper.get(props, attribute));
          return prev;
        },
        {})
    });
  };

  let get = (originProps = {}) => {
    let dataStr = localStorage[key];
    if (!dataStr)
      return responseOriginProps(originProps);

    try {
      let data = JSON.parse(dataStr);
      if (data.version < version) {
        return responseOriginProps(originProps);
      } else if (data.version < version) {
        console.error(
          `unexpected situation happened, storaged data version is bigger than current version. Storaged data version is ${
            data.version
          }. Current version is ${
            version
                                                                                                                                                 }.`); // eslint-disable-line
        return responseOriginProps(originProps);
      } else {
        // merge dataProps and stored props
        return helper.deepMergeMap(originProps, data.props);
      }
    } catch (err) {
      return responseOriginProps(originProps);
    }
  };

  let responseOriginProps = (originProps) => {
    set(originProps);
    return originProps;
  };

  return {get, set};
};

let getDefaultKey =
    ({pageQueryKey = 'page'} = {}) => { // key should reflect a page
      let key = `${document.title}-${window.location.pathname}`;

      let obj = querystring.parse(window.location.search.substring(1));

      if (obj && obj[pageQueryKey] !== undefined) {
        key = `${key}?page=${obj[pageQueryKey]}`;
      }

      return key;
    };

let wrapPagePropsWithStore = (props, options = {}) => {
  let {get, set} = pagePropsStore(options);

  let originOnsignal = props.onsignal;

  props.onsignal = (signal, data, ctx) => {
    if (options.signalTypes) {
      if (options.signalTypes.findIndex((type) => signal.type === type) !==
          -1) {
        set(data.props);
      }
    } else {
      set(data.props);
    }
    return originOnsignal && originOnsignal(signal, data, ctx);
  };

  return get(props);
};

module.exports = {
  pagePropsStore,
  wrapPagePropsWithStore
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/theme/base/actions.js":
/*!****************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/theme/base/actions.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (basics) => {
  return {
    hover: {
      backgroundColor: basics.hoverColor
    },

    active: {
      backgroundColor: basics.hoverColor
    },

    focus: {
      outline: 'none'
    },

    flatHover: {
      color: basics.hoverColor
    },

    flatActive: {
      color: basics.hoverColor
    }
  };
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/theme/base/bulk.js":
/*!*************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/theme/base/bulk.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
  styles
} = __webpack_require__(/*! ../../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

let layout = __webpack_require__(/*! ./layout */ "./node_modules/kabanery-lumine/lib/theme/base/layout.js");

let {
  container
} = layout;

module.exports = (basics) => {
  let bulk = styles(container, {
    minWidth: 40,
    backgroundColor: basics.blockColor,
    color: basics.fontColor
  });

  let contrastBulk = styles(bulk, {
    backgroundColor: basics.contrastBlockColor,
    color: basics.contrastFontColor
  });

  let oneLineBulk = styles(bulk, {
    padding: basics.narrowPadding,
    fontSize: basics.normalSize,
    textAlign: 'center',
    lineHeight: 20,
    textDecoration: 'none',
    border: 'none',
    color: basics.fontColor
  });

  let flatOneLineBulk = styles(oneLineBulk, {
    display: 'inline-block',
    backgroundColor: basics.contrastBlockColor,
    color: basics.blockColor
  });

  let modalBulk = styles(oneLineBulk, contrastBulk, {
    display: 'inline-block',
    boxShadow: `3px 3px 5px ${basics.shadowColor}`
  });

  return {
    bulk,
    contrastBulk,
    oneLineBulk,
    modalBulk,
    flatOneLineBulk
  };
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/theme/base/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/theme/base/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let layout = __webpack_require__(/*! ./layout */ "./node_modules/kabanery-lumine/lib/theme/base/layout.js");
let Bulk = __webpack_require__(/*! ./bulk */ "./node_modules/kabanery-lumine/lib/theme/base/bulk.js");
let Actions = __webpack_require__(/*! ./actions */ "./node_modules/kabanery-lumine/lib/theme/base/actions.js");
let Widget = __webpack_require__(/*! ./widget */ "./node_modules/kabanery-lumine/lib/theme/base/widget.js");

module.exports = (basics, custom = {}) => {
  let bulks = Bulk(basics);
  let actions = Actions(basics);
  let widgets = Widget(basics, layout, bulks);

  if (typeof custom === 'function') {
    custom = custom(basics, layout, bulks);
  }

  bulks = Object.assign(bulks, custom.bulks || {});
  actions = Object.assign(actions, custom.actions || {});
  widgets = Object.assign(widgets, custom.widgets || {});

  return Object.assign({
    basics,
    actions
  }, layout, bulks, actions, widgets);
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/theme/base/layout.js":
/*!***************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/theme/base/layout.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
  styles
} = __webpack_require__(/*! ../../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

let container = {
  position: 'relative',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  overflow: 'auto'
};

let fullParentHeight = {
  height: '100%'
};

let fullParentWidth = {
  width: '100%'
};

let fullWindow = styles(container, {
  position: 'fixed',
  left: 0,
  top: 0,
},
fullParentWidth, fullParentHeight);

let fullParent = styles(container, fullParentWidth, fullParentHeight);

let flat = {
  appearance: 'none',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  border: 0
};

module.exports = {
  fullWindow,
  fullParent,
  fullParentWidth,
  fullParentHeight,
  container,
  flat
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/theme/base/widget.js":
/*!***************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/theme/base/widget.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let {
  styles
} = __webpack_require__(/*! ../../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

module.exports = (basics, layout, bulks) => {
  let {
    contrastBulk
  } = bulks;
  let {
    flat
  } = layout;

  let cardBox = styles(contrastBulk, flat, {
    border: `1px solid ${basics.shadowColor}`,
    boxShadow: `3px 3px 5px ${basics.shadowColor}`,
    borderRadius: 2
  });

  let inputBox = styles(contrastBulk, flat, {
    width: 260,
    padding: basics.narrowPadding,
    backgroundColor: basics.fontColor
  });

  let textAreaBox = styles(inputBox, {
    width: 360,
    height: 200,
    outline: 'none',
    resize: 'none',
    overflow: 'auto',
    border: `1px solid ${basics.borderColor}`,
    borderRadius: 5,
    fontSize: 16
  });

  let underLineBorder = {
    border: 0,
    borderRadius: 0,
    'border-bottom': `1px solid ${basics.borderColor}`
  };

  let underLineFocus = {
    paddingBottom: basics.narrowPaddingBottom - 1,
    'border-bottom': `2px solid ${basics.blockColor}`
  };

  let flatRippleMask = {
    content: '',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 5,
    height: 5,
    backgroundColor: basics.halfBlockColor,
    opacity: '0',
    borderRadius: '100%',
    transform: 'scale(1, 1) translate(-50%)',
    transformOrigin: '50% 50%'
  };

  return {
    inputBox,
    textAreaBox,
    underLineBorder,
    underLineFocus,
    flatRippleMask,
    cardBox
  };
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/theme/steady/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/theme/steady/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let base = __webpack_require__(/*! ../base */ "./node_modules/kabanery-lumine/lib/theme/base/index.js");

module.exports = base({
  pageColor: 'white',
  hoverColor: '#90CAF9',
  blockColor: '#2196F3', // rgb(33,150,243)
  borderColor: '#1565C0',
  veilColor: 'rgba(125,125,125,0.6)',
  fontColor: 'white',
  noticeColor: 'rgb(2, 40, 51)',
  shadowColor: 'rgba(100,100,100,0.2)',

  // half
  halfBlockColor: 'rgba(33,150,243,0.5)',

  titleSize: 20,
  normalSize: 16,

  narrowPadding: '4 8 4 8',
  narrowPaddingTop: 4,
  narrowPaddingRight: 8,
  narrowPaddingBottom: 4,
  narrowPaddingLeft: 8,

  narrowMargin: '4 8 4 8',

  contrastBlockColor: 'white',
  contrastFontColor: 'black'
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/util/classTable.js":
/*!*************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/util/classTable.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  isMapObject
} = __webpack_require__(/*! ./helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

const {
  mount,
  n,
  parseStyle
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");

const VIEW_CLASS_PREFIX = 'kabanery-lumine';

let count = -1;

module.exports = (classTable) => {
  count++;

  let viewClassId = `${VIEW_CLASS_PREFIX}-${count}`;

  let getStyleRuleName = (name) => {
    if (name[0] === '@') {
      let prev = name.split(' ')[0];
      let next = name.substring(prev.length).trim();
      return `${prev} ${viewClassId}-${next}`;
    } else {
      return `.${viewClassId}-${name}`;
    }
  };

  let appendStyle = () => {
    if (styleCssRules) {
      mount(n('style', {
        id: viewClassId
      }, styleCssRules), document.head);
      styleCssRules = null;
    }
  };

  let getClassName = (name) => {
    if (name[0] === '@') {
      let prev = name.split(' ')[0];
      let next = name.substring(prev.length).trim();
      name = next;
    }

    return `${viewClassId}-${name.split(':')[0]}`;
  };

  let updateClassTable = (newClassTable) => {
    let node = document.getElementById(viewClassId);
    if (node) {
      node.parentNode.removeChild(node);
    }

    setStyleCssRules(newClassTable);
    appendStyle();
  };

  let styleCssRules = null;

  let setStyleCssRules = (classTable) => {
    if (isMapObject(classTable)) {
      styleCssRules = '';
      for (let name in classTable) {
        name = name.trim();
        let styleRuleName = getStyleRuleName(name);
        let classCnt = classTable[name];
        if (typeof classCnt === 'function') {
          classCnt = classCnt({
            getClassName
          });
        }
        let styleRuleContent = parseStyle(classCnt, {
          valueWrapper: (value) => `${value !== ''? value: '\'\''} !important`
        });
        styleCssRules += `\n${styleRuleName} {${styleRuleContent}}`;
      }
    }
  };

  setStyleCssRules(classTable);

  return {
    appendStyle,
    getClassName,
    updateClassTable
  };
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/util/compose.js":
/*!**********************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/util/compose.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  get,
  set
} = __webpack_require__(/*! ./helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

const {
  Signal
} = __webpack_require__(/*! lumine-signal */ "./node_modules/lumine-signal/index.js");

const CHILD_SOURCE_TYPE = 'child';

const identity = v => v;

/**
 * binding view with another view's props through a key map
 *
 * keyMap = {
 *    binderKey: bindedKey
 * }
 */

let syncBindWithKeyMap = (ctx, keyMap, {
  bindedProps = {},
  stopSignal,
  autoUpdate = false,
  updatedSignalTypes = null,
  onChildSignal,
  toBinded = identity,
  toBinder = identity
} = {}) => {
  // TODO check

  let mappings = [];
  for (let binderKey in keyMap) {
    mappings.push([binderKey, keyMap[binderKey]]);
  }

  let viewData = ctx.getData();

  let onsignal = (signal, data, sourceCtx) => {
    // when event happened, sync the data
    mappings.forEach(([binderKey, bindedKey]) => {
      let propValue = get(data.props, bindedKey); // get from child

      // update props
      viewData.props = set(viewData.props, binderKey, toBinder(propValue, binderKey, bindedKey)); // set for parent
    });

    // handle the signal if necessary
    onChildSignal && onChildSignal(signal, data, sourceCtx);

    if (!stopSignal) {
      // pop up the signal, TODO wrap the sigal to resolve chain
      ctx.notify(
        Signal(signal.type, signal.data, {
          sourceType: CHILD_SOURCE_TYPE,
          keyMap,
          sourceSignal: signal,
          sourceData: data,
          sourceCtx
        })
      );
    }

    if (autoUpdate) {
      if (!updatedSignalTypes) {
        ctx.update(); // update binder view
      } else {
        if (updatedSignalTypes.findIndex((type) => type === signal.type) !== -1) {
          ctx.update(); // update binder view
        }
      }
    }
  };

    // construct child props
  let mapedPropsValue = mappings.reduce((prev, [binderKey, bindedKey]) => {
    let propValue = get(viewData.props, binderKey); // get from binder
    set(prev, bindedKey, toBinded(propValue, binderKey, bindedKey)); // set for binded
    return prev;
  }, {});


  return Object.assign({
    theme: viewData.props.theme // extend theme by default
  }, bindedProps, mapedPropsValue, {
    onsignal
  });
};

module.exports = {
  syncBindWithKeyMap
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/util/helper.js":
/*!*********************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/util/helper.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const styles = (...styleObjects) => {
  return Object.assign({}, ...styleObjects);
};

const isMapObject = (v) => {
  return v && typeof v === 'object' && !Array.isArray(v);
};

const deepMergeMap = (tar, def, path = '', options = {}) => {
  let blackList = options.blackList || [];
  if (blackList.findIndex((item) => item === path) !== -1) {
    return tar;
  }
  if (isMapObject(def)) {
    tar = tar || {};
    if (isMapObject(tar)) {
      for (let name in def) {
        tar[name] = deepMergeMap(tar[name], def[name], path === '' ? name : path + '.' + name, options);
      }
    }
    return tar;
  } else {
    if (tar === undefined) return def;
    return tar;
  }
};

const resolveFnValue = (fn, ...args) => {
  if (typeof fn === 'function') {
    return resolveFnValue(fn(...args));
  }

  return fn;
};

const get = (obj, key = '') => {
  key = key.trim();
  let parts = !key ? [] : key.split('.');

  let partLen = parts.length;
  for (let i = 0; i < partLen; i++) {
    let part = parts[i].trim();
    if (part) {
      obj = obj[part];
    }
  }

  return obj;
};

const set = (obj, key = '', value) => {
  key = key.trim();

  if (key === '' || key === '.') { // replace
    return value;
  } else {
    let parts = !key ? [] : key.split('.');
    if (!parts.length) return;
    let parent = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      let part = parts[i];
      part = part.trim();
      if (part) {
        let next = parent[part];
        if (!isObject(next)) {
          next = {};
          parent[part] = next;
        }
        parent = next;
      }
    }

    parent[parts[parts.length - 1]] = value;
  }

  return obj;
};

const isObject = (v) => v && typeof v === 'object';

const isString = (v) => typeof v === 'string';

const likeArray = (v) => v && typeof v === 'object' && typeof v.length === 'number';

module.exports = {
  styles,
  isMapObject,
  deepMergeMap,
  resolveFnValue,
  get,
  set,
  isObject,
  likeArray,
  isString
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/util/lumineView.js":
/*!*************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/util/lumineView.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let lumineViewer = __webpack_require__(/*! ./lumineViewer */ "./node_modules/kabanery-lumine/lib/util/lumineViewer.js");

module.exports = (viewFun, options) => lumineViewer(viewFun)(options);


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/util/lumineViewer.js":
/*!***************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/util/lumineViewer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  view,
  parseArgs
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");
const steadyTheme = __webpack_require__(/*! ../theme/steady */ "./node_modules/kabanery-lumine/lib/theme/steady/index.js");
const {
  deepMergeMap,
  resolveFnValue
} = __webpack_require__(/*! ./helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");
const ClassTable = __webpack_require__(/*! ./classTable */ "./node_modules/kabanery-lumine/lib/util/classTable.js");
const {
  Signal,
  pass
} = __webpack_require__(/*! lumine-signal */ "./node_modules/lumine-signal/index.js");
const JsonTree = __webpack_require__(/*! tree-script/lib/jsonTree */ "./node_modules/tree-script/lib/jsonTree.js");
const {
  executeAST
} = __webpack_require__(/*! tree-script */ "./node_modules/tree-script/index.js");
const n = __webpack_require__(/*! ./n */ "./node_modules/kabanery-lumine/lib/util/n.js");
const {
  syncBindWithKeyMap
} = __webpack_require__(/*! ./compose */ "./node_modules/kabanery-lumine/lib/util/compose.js");

/**
 * define the general interface for lumine view
 *
 * 1. unify view data structure
 *
 *    view data = {
 *       // public data
 *       props,
 *       children // child views
 *    }
 *
 *    props.onsigal
 *    props.theme
 *
 * 2. onsignal interface
 *
 *    onsignal: (signal, data, ctx) -> Any
 */

module.exports = (viewFun) => ({
  defaultProps = {},
  defaultChildren = [],
  theme = steadyTheme,
  classTable
} = {}) => {
  let defaultStyle = defaultProps.style || {};

  let defaultStyleValue = resolveFnValue(defaultStyle, theme);
  let classTableValue = resolveFnValue(classTable, theme);

  let {
    appendStyle,
    getClassName,
    updateClassTable
  } = ClassTable(classTableValue);

  const component = view((viewData, ctx) => {
    viewData.props = viewData.props || {};
    viewData.children = (viewData.children && viewData.children.length) ? viewData.children : defaultChildren;
    viewData.props.theme = viewData.props.theme || theme;

    appendStyle();
    // TODO check view Data

    // update defaultStyleValue
    if (viewData.props.theme && typeof defaultStyle === 'function') {
      defaultStyleValue = resolveFnValue(defaultStyle, viewData.props.theme);
    }

    // update class table
    if (viewData.theme && typeof classTable === 'function') {
      classTableValue = resolveFnValue(classTable, viewData.props.theme);
      updateClassTable(classTableValue);
    }

    // merge props (deep merge)
    viewData.props.style = deepMergeMap(viewData.props.style, defaultStyleValue);
    viewData.props = deepMergeMap(viewData.props, defaultProps);

    ctx.getClassName = getClassName;

    return viewFun(viewData, ctx);
  });

  // create a view instance
  return (...args) => {
    const viewNode = component(...args);
    hookCtx(viewNode.ctx);
    return viewNode;
  };
};

const hookCtx = (ctx) => {
  // signal system
  // TODO (signalType, data) => void
  const notify = (signal) => {
    const viewData = ctx.getData();
    if (viewData.props.onsignal) {
      let sig = signal;

      // accept string directly as signal
      if (typeof signal === 'string') {
        sig = Signal(signal);
      }

      viewData.props.onsignal(sig, ctx.getData(), ctx);
    }
  };

  const updateWithNotify = (signal, ...updateScript) => {
    signal = signal || Signal('update-view-data');
    ctx.update(...updateScript);
    // notify
    notify(signal);
  };

  ctx.notify = notify;
  ctx.updateWithNotify = updateWithNotify;

  // update with tree script
  // TODO remove updateTree api
  // @deprecated
  ctx.updateTree = ({
    ast,
    variableStub
  }, variableMap, signal) => {
    signal = signal || Signal('update-view-data');

    let viewDataTree = JsonTree(ctx.getData());

    // update view data by running update script
    executeAST(ast, {
      queryByPath: viewDataTree.queryByPath,
      setByPath: viewDataTree.setByPath,
      removeByPath: viewDataTree.removeByPath,
      appendByPath: viewDataTree.appendByPath,
      variableMap,
      variableStub
    });

    updateWithNotify(signal);
  };

  // binding n
  ctx.bn = (bindingMap, options) => {
    // TODO check bindingMap
    return (...args) => {
      let tagName = args[0];
      let {
        attributes,
        childs
      } = parseArgs(args, {
        doParseStyle: false
      });

      return n(tagName, syncBindWithKeyMap(ctx, bindingMap, Object.assign({}, options, {
        bindedProps: attributes
      })), childs);
    };
  };

  // pass
  ctx.pass = (...args) => pass(ctx, ...args);
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/util/n.js":
/*!****************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/util/n.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
  n,
  parseArgs
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");

module.exports = (...args) => {
  let tagName = args[0];

  if (typeof tagName === 'string') {
    return n(...args);
  } else { // regard as lumine view
    let {
      attributes,
      childs
    } = parseArgs(args, {
      doParseStyle: false
    });

    return tagName({
      props: attributes,
      children: childs
    });
  }
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/util/treeScript.js":
/*!*************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/util/treeScript.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
  parseStrToAst,
  checkAST
} = __webpack_require__(/*! tree-script */ "./node_modules/tree-script/index.js");

let compileTreeScript = (treeScriptCode, {
  variableStub
} = {}) => {
  let ast = parseStrToAst(treeScriptCode);

  if (variableStub) {
    checkAST(ast, {
      variableStub
    });
  }

  return {
    ast,
    variableStub
  };
};

module.exports = {
  compileTreeScript
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/cssShapes/angle.js":
/*!******************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/cssShapes/angle.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const line = __webpack_require__(/*! ./line */ "./node_modules/kabanery-lumine/lib/view/cssShapes/line.js");
const {
  n
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");

module.exports = ({
  length = 10,
  bold = 1,
  color = 'black',
  angle = 0,
  direction
} = {}) => {
  if (direction === 'left') {
    angle = 45;
  } else if (direction === 'top') {
    angle = 135;
  } else if (direction === 'right') {
    angle = 225;
  } else if (direction === 'bottom') {
    angle = 315;
  }
  return n('div', {
    style: {
      display: 'inline-block',
      transform: `rotate(${angle}deg)`
    }
  }, [
    line({
      color,
      bold,
      length
    }),

    n('div', {
      style: {
        marginLeft: length / 2 - bold / 2,
        marginTop: -1 * length / 2 - bold / 2
      }
    }, [
      line({
        color,
        bold,
        length,
        angle: 90
      })
    ])
  ]);
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/cssShapes/line.js":
/*!*****************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/cssShapes/line.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  n
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");

module.exports = ({
  color = 'black',
  bold = 3,
  length = 20,
  direction = 'vertical',
  angle = 0
} = {}) => {
  return direction === 'vertical' ?
    n('div', {
      style: {
        width: bold,
        height: length,
        backgroundColor: color,
        transform: `rotate(${angle}deg)`
      }
    }) : n('div', {
      style: {
        height: bold,
        width: length,
        backgroundColor: color,
        transform: `rotate(${angle}deg)`
      }
    });
};


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/empty/empty.js":
/*!**************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/empty/empty.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const n = __webpack_require__(/*! ../../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");
const lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");

module.exports = lumineView(() => {
  return n('div', {
    style: {
      width: 0,
      height: 0
    }
  });
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/fold/fold.js":
/*!************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/fold/fold.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const n = __webpack_require__(/*! ../../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");
const lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");
const FoldArrow = __webpack_require__(/*! ./foldArrow */ "./node_modules/kabanery-lumine/lib/view/fold/foldArrow.js");

module.exports = lumineView(({
  props,
  children
}, {
  updateWithNotify
}) => {
  let Body = children[1];

  let Head = n('div', {
    onclick: () => {
      updateWithNotify(null, 'props.hide', !props.hide);
    },
    style: props.style.title
  }, [
    props.arrow && n(FoldArrow, {
      hide: props.hide
    }),
    children[0]
  ]);

  return n('div', {
    style: props.style.container
  }, [
    Head, !props.hide && Body
  ]);
}, {
  defaultProps: {
    hide: false,
    arrow: true,
    style: {
      container: {},
      title: {
        cursor: 'pointer'
      }
    }
  }
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/fold/foldArrow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/fold/foldArrow.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  n
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");

const angle = __webpack_require__(/*! ../cssShapes/angle */ "./node_modules/kabanery-lumine/lib/view/cssShapes/angle.js");
const lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");

module.exports = lumineView(({
  props
}) => {
  return n('span', {
    style: {
      display: 'inline-block',
      padding: '0 8 0 8'
    }
  }, [angle({
    direction: props.hide ? 'bottom' : 'top',
    length: 5,
    color: '#666666'
  })]);
}, {
  defaultProps: {
    hide: false
  }
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/input/input.js":
/*!**************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/input/input.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  n
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");

const lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");

const {
  Signal
} = __webpack_require__(/*! lumine-signal */ "./node_modules/lumine-signal/index.js");

const {
  styles
} = __webpack_require__(/*! ../../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

module.exports = lumineView(({
  props
}, {
  notify,
  getClassName
}) => {
  let attributes = {
    'class': `${getClassName('input')}`,
    style: props.style,
    type: props.type,
    placeholder: props.placeholder,
    oninput: (e) => {
      props.value = e.target.value;
      notify(Signal('input'));
    },
    value: props.value
  };
  if (props.id) {
    attributes.id = props.id;
  }
  return n('input', attributes);
}, {
  defaultProps: {
    value: '',
    type: 'value',
    placeholder: '',
    style: (theme) => styles(theme.inputBox, theme.underLineBorder)
  },

  classTable: (theme) => {
    return {
      'input:focus': styles(theme.actions.focus, theme.underLineFocus)
    };
  }
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/layout/full.js":
/*!**************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/layout/full.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  n
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");
const lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");
const {
  styles
} = __webpack_require__(/*! ../../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

module.exports = lumineView(({
  props,
  children
}) => {
  return n('div', {
    style: props.style
  }, children);
}, {
  defaultProps: {
    style: (theme) => styles(theme.fullParent)
  },

  defaultChildren: ['']
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/layout/fullWindow.js":
/*!********************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/layout/fullWindow.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  n
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");
const lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");
const {
  styles
} = __webpack_require__(/*! ../../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");
const {
  Signal
} = __webpack_require__(/*! lumine-signal */ "./node_modules/lumine-signal/index.js");

module.exports = lumineView(({
  props,
  children
}, {
  notify
}) => {
  return n('div', {
    style: props.style,
    onclick: () => {
      notify(Signal('fullwindow-click'));
    }
  }, children);
}, {
  defaultProps: {
    style: (theme) => {
      return styles(theme.fullWindow);
    }
  },

  defaultChildren: []
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/loading/pageLoading.js":
/*!**********************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/loading/pageLoading.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let n = __webpack_require__(/*! ../../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");
let lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");

let TextLoading = __webpack_require__(/*! ./textLoading */ "./node_modules/kabanery-lumine/lib/view/loading/textLoading.js");
let PageMask = __webpack_require__(/*! ../mask/pageMask */ "./node_modules/kabanery-lumine/lib/view/mask/pageMask.js");
let Empty = __webpack_require__(/*! ../empty/empty */ "./node_modules/kabanery-lumine/lib/view/empty/empty.js");

module.exports = lumineView(({
  props,
  children
}) => {
  return props.show ? n(PageMask, {
    style: props.style
  }, children) : n(Empty);
}, {
  defaultProps: {
    show: true,
    style: {
      textAlign: 'center'
    }
  },
  defaultChildren: [n(TextLoading, {
    style: {
      position: 'relative',
      top: '50%',
      marginTop: -10
    }
  })]
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/loading/textLoading.js":
/*!**********************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/loading/textLoading.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let n = __webpack_require__(/*! ../../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");

let lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");

// TODO easy disappear for loading view
module.exports = lumineView(({
  props
}, {
  getClassName
}) => {
  return props.show ? n('div', {
    'class': getClassName('load-suffix'),
    style: props.style
  }, props.textPrefix) : n('div');
}, {
  defaultProps: {
    textPrefix: 'loading',
    show: true,
    style: {
      display: 'inline-block'
    }
  },

  classTable: {
    '@keyframes loading': `
    0% {
        content: ""
    }
    33% {
        content: "."
    }
    67% {
        content: ".."
    }
    100% {
        content: "..."
    }`,
    'load-suffix::after': ({
      getClassName
    }) => {
      return {
        content: JSON.stringify('.'),
        animation: `${getClassName('loading')} 3s infinite ease-in-out`
      };
    }
  }
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/mask/pageMask.js":
/*!****************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/mask/pageMask.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let FullWindow = __webpack_require__(/*! ../layout/fullWindow */ "./node_modules/kabanery-lumine/lib/view/layout/fullWindow.js");
let lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");
let n = __webpack_require__(/*! ../../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");

module.exports = lumineView(({
  props,
  children
}) => {
  return n(FullWindow, props, children);
}, {
  defaultProps: {
    style: (theme) => {
      return {
        backgroundColor: theme.basics.veilColor,
        color: theme.basics.fontColor,
        zIndex: 1000
      };
    }
  }
});


/***/ }),

/***/ "./node_modules/kabanery-lumine/lib/view/notice/notice.js":
/*!****************************************************************!*\
  !*** ./node_modules/kabanery-lumine/lib/view/notice/notice.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let n = __webpack_require__(/*! ../../util/n */ "./node_modules/kabanery-lumine/lib/util/n.js");
let lumineView = __webpack_require__(/*! ../../util/lumineView */ "./node_modules/kabanery-lumine/lib/util/lumineView.js");
let {
  Signal
} = __webpack_require__(/*! lumine-signal */ "./node_modules/lumine-signal/index.js");

let {
  styles
} = __webpack_require__(/*! ../../util/helper */ "./node_modules/kabanery-lumine/lib/util/helper.js");

let {
  compileTreeScript
} = __webpack_require__(/*! ../../util/treeScript */ "./node_modules/kabanery-lumine/lib/util/treeScript.js");

let S_HideNotice = compileTreeScript('.props.show=false');

module.exports = lumineView(({
  props
}, {
  updateTree
}) => {
  if (props.show && props.duration !== 'forever') {
    setTimeout(() => {
      updateTree(S_HideNotice, null, Signal('notice-hide'));
    }, props.duration);
  }

  return n('div', {
    style: {
      zIndex: 10000,
      position: 'fixed',
      width: '100%',
      height: 0,
      left: 0,
      top: '50%',
      textAlign: 'center'
    }
  }, [
    props.show && n('div', {
      style: props.style
    }, props.text)
  ]);
}, {
  defaultProps: {
    text: '',
    show: true,
    duration: 3000,
    style: (theme) => styles(theme.oneLineBulk, {
      display: 'inline-block',
      backgroundColor: theme.basics.noticeColor,
      maxWidth: 400,
      maxHeight: 200,
      top: -100,
      position: 'relative',
    })
  }
});


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/index.js":
/*!****************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib */ "./node_modules/kabanery-signal-flow/lib/index.js");


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
    getTreeScriptAst,
    updateTree,
    sequence,
    delay,
    retry,
    applyFunPromise
} = __webpack_require__(/*! ./util */ "./node_modules/kabanery-signal-flow/lib/util.js");

/**
 * action flow
 */
const ACTION_SIGNAL_UPDATE_STATE = 'updateState';
const ACTION_SIGNAL_SEND_REQUEST = 'sendRequest';

/**
 * variableMap: global variable map
 *
 * TODO support general action flow
 *
 * TODO generate variable stub from variable map
 */
const signalActionFlow = (signalActionMap, pageEnv, {
    variableMap = {},
    variableStub,
    onError
} = {}) => {
    // TODO validate signalActionMap
    // TODO do not modify source map, generate a new one
    let contentMap = {};

    for (const name in signalActionMap) {
        contentMap[name] = parseActions(signalActionMap[name], variableMap, variableStub);
    }
    // handler
    return (signal, viewState, ctx) => {
        if (contentMap[signal.type]) {
            const source = {
                signal,
                viewState,
                props: viewState.props
            };

            return applyFunPromise(contentMap[signal.type], [source, ctx, pageEnv]).catch((err) => {
                if (onError) {
                    onError(err);
                } else {
                    throw err;
                }
            });
        }
    };
};

const parseActions = (actions, variableMap, variableStub) => {
    if (!actions) return null;

    if (!Array.isArray(actions)) {
        actions = [actions];
    }

    const contents = actions.map((action) => {
        let signalAction = action;

        if (typeof signalAction === 'string') {
            signalAction = {
                content: signalAction
            };
        } else if (typeof signalAction === 'number') {
            const time = signalAction;
            signalAction = {
                content: () => delay(time)
            };
        }

        return parseSignalActionContent(signalAction, variableMap, variableStub);
    });

    return (...params) => {
        return sequence(contents, params);
    };
};

const parseSignalActionContent = (action, _variableMap, _variableStub) => {
    const type = action.type || ACTION_SIGNAL_UPDATE_STATE;
    const cnt = action.content;
    if (typeof cnt !== 'string' && typeof cnt !== 'function') {
        throw new Error(`Content of action should be string or function, but got ${cnt}, in action ${type}.`);
    }

    const nextVariableMap = getVariableMap(_variableMap, action);
    const nextVariableStub = getVariableStub(_variableStub, action);

    if (typeof cnt === 'string') {
        if (type === ACTION_SIGNAL_UPDATE_STATE) { // update state
            return updateStateHandler(action, nextVariableMap, nextVariableStub);
        } else if (type === ACTION_SIGNAL_SEND_REQUEST) {
            return sendRequestHandler(action, nextVariableMap, nextVariableStub);
        } else {
            throw new Error(`unexpected action type for a signal action, type is ${type}`);
        }
    } else {
        return cnt;
    }
};

/**
 * update state action handlers
 *
 * {
 *   type,
 *   content,
 *   variableMap,
 *   variableStub
 * }
 */

const updateStateHandler = (action, variableMap, variableStub) => {
    const ast = getTreeScriptAst(action.content, variableStub);

    return (source, ctx) => {
        try {
            updateTree(source, ast, variableMap, variableStub);
            ctx.updateWithNotify();

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };
};

/**
 * send request action
 *
 * {
 *   type,
 *   content,
 *   variableMap,
 *   variableStub,
 *   response: action,
 *   error: action
 * }
 */
// TODO retry

const sendRequestHandler = (action, variableMap, variableStub) => {
    // TODO forbidden assign or other update opeartion in tree-script
    const requestAst = getTreeScriptAst(action.content, variableStub);
    const responseUpdate = parseActions(action.response, variableMap, variableStub);
    const errorUpdate = parseActions(action.error, variableMap, variableStub);

    return (source, ctx, pageEnv) => {
        const {
            runApi,
            apiMap
        } = pageEnv;
        let apiRet = null;
        try {
            const requestContext = Object.assign({}, variableMap, apiMap);
            const apiData = updateTree(source, requestAst, requestContext, variableStub);

            apiRet = retry(runApi, [apiData], action.retry || 0);
        } catch (err) {
            apiRet = Promise.reject(err);
        }

        return Promise.resolve(apiRet).then((response) => {
            return responseUpdate && responseUpdate(Object.assign({}, source, {
                response,
                from: source
            }), ctx, pageEnv);
        }).catch((error) => {
            errorUpdate && errorUpdate(Object.assign(source, {
                errorMsg: error.toString(),
                error,
                from: source
            }), ctx, pageEnv);
            throw error;
        });
    };
};

const getVariableMap = (variableMap, action) => {
    if (!action.variableMap) return variableMap;
    return Object.assign({}, variableMap, action.variableMap);
};

const getVariableStub = (variableStub, action) => {
    if (!action.variableStub) return variableStub;
    return Object.assign({}, variableStub, action.variableStub);
};

module.exports = {
    signalActionFlow
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/lib/util.js":
/*!*******************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/lib/util.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
    parseStrToAst,
    checkAST,
    executeAST
} = __webpack_require__(/*! tree-script */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/index.js");

const JsonTree = __webpack_require__(/*! tree-script/lib/jsonTree */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/lib/jsonTree.js"); // using json tree, right now

const getTreeScriptAst = (code, variableStub) => {
    let ast = parseStrToAst(code);

    if (variableStub) {
        checkAST(ast, {
            variableStub
        });
    }

    return ast;
};

const updateTree = (source, ast, variableMap, variableStub) => {
    let tree = JsonTree(source);

    return executeAST(ast, {
        queryByPath: tree.queryByPath,
        setByPath: tree.setByPath,
        removeByPath: tree.removeByPath,
        appendByPath: tree.appendByPath,
        variableMap,
        variableStub
    });
};

const sequence = (fns, params = []) => {
    if (!fns.length) return Promise.resolve([]);
    const top = fns[0];

    return Promise.resolve(top(...params)).then((fstRet) => {
        return sequence(fns.slice(1), params).then(rest => {
            rest.unshift(fstRet);
            return rest;
        });
    });
};

const delay = (t) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, t);
    });
};

const retry = (fn, params, count = 0) => {
    return applyFunPromise(fn, params).catch(err => {
        if (count <= 1) {
            throw err;
        } else {
            return retry(fn, params, count - 1);
        }
    });
};

const applyFunPromise = (fn, params) => {
    try {
        return Promise.resolve(fn(...params));
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = {
    getTreeScriptAst,
    updateTree,
    sequence,
    delay,
    retry,
    applyFunPromise
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/grammer/tokenTypes.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/grammer/tokenTypes.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    stringGraph,
    numberGraph
} = __webpack_require__(/*! cl-fsm/apply/json */ "./node_modules/cl-fsm/apply/json/index.js");

let {
    buildFSM
} = __webpack_require__(/*! stream-token-parser */ "./node_modules/stream-token-parser/index.js");

let FSM = __webpack_require__(/*! cl-fsm */ "./node_modules/cl-fsm/index.js");
let {
    stateGraphDSL
} = FSM;

let {
    g,
    c,
    union,
    sequence,
    range,
    circle
} = stateGraphDSL;

let whitespace = union(' ', '\f', '\n', '\r', '\t', '\v', '\u00a0', '\u1680', '\u180e', '\u2000-', '\u200a', '\u2028', '\u2029', '\u202f', '\u205f', '\u3000', '\ufeff');

// .abcbf
// .0
// ._
let nodeName = g(sequence(
    '.',
    union('_', '%', range('a', 'z'), range('A', 'Z'), range('0', '9')),
    circle(union('_', '%', range('a', 'z'), range('A', 'Z'), range('0', '9')))
));

let variableName = g(sequence(
    union('_', range('a', 'z'), range('A', 'Z')),
    circle(union('_', range('a', 'z'), range('A', 'Z'), range('0', '9')))
));

let nodeNameVariable = g(sequence(
    '.',
    '[',

    circle(whitespace, g(sequence(
        union('_', range('a', 'z'), range('A', 'Z')),

        circle(union('_', range('a', 'z'), range('A', 'Z'), range('0', '9')),
            circle(whitespace,
                g(c(']'))
            ),
        ))))
));

module.exports = [

    {
        priority: 1,
        match: 'true',
        name: 'true'
    }, {
        priority: 1,
        match: 'false',
        name: 'false'
    }, {
        priority: 1,
        match: 'null',
        name: 'null'
    }, {
        priority: 1,
        match: buildFSM(stringGraph),
        name: 'string'
    }, {
        priority: 1,
        match: buildFSM(numberGraph),
        name: 'number'
    },

    {
        priority: 1,
        match: buildFSM(nodeName),
        name: 'nodeName'
    },
    {
        priority: 1,
        match: buildFSM(nodeNameVariable),
        name: 'nodeNameVariable'
    },
    {
        priority: 1,
        match: buildFSM(variableName),
        name: 'variableName'
    },
    {
        priority: 1,
        match: '=',
        name: 'assign'
    },
    {
        priority: 1,
        match: '-',
        name: 'delete'
    },
    {
        priority: 1,
        match: '+',
        name: 'append'
    },
    {
        priority: 1,
        match: ';',
        name: 'semicolon'
    },
    {
        priority: 1,
        match: ':',
        name: 'colon'
    },
    {
        priority: 1,
        match: '(',
        name: 'leftBracket'
    },
    {
        priority: 1,
        match: ')',
        name: 'rightBracket'
    },
    {
        priority: 1,
        match: ',',
        name: 'comma'
    },
    {
        priority: 1,
        match: '{',
        name: 'leftBrace'
    },
    {
        priority: 1,
        match: '}',
        name: 'rightBrace'
    },
    {
        priority: 1,
        match: '?',
        name: 'questionMark'
    },
    {
        priority: 1,
        match: buildFSM(g(
            c(whitespace)
        )),
        name: 'whitespace'
    }
];


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/index.js");


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/lib/jsonTree.js":
/*!************************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/lib/jsonTree.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    autoId,
    isObject,

    modifySuccess,
    removeNoneExist,
    removeSuccess
} = __webpack_require__(/*! ./util */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/lib/util.js");

module.exports = (jsonData, {
    missingValue = undefined
} = {}) => {
    let queryByPath = (path) => {
        let cur = jsonData;
        for (let i = 0; i < path.length; i++) {
            if (!isObject(cur)) {
                return missingValue;
            } else {
                if (cur.hasOwnProperty(path[i])) {
                    cur = cur[path[i]];
                } else {
                    return missingValue;
                }
            }
        }

        return cur;
    };

    let setByPath = (path, value) => {
        let parent = jsonData;

        for (let i = 0; i < path.length - 1; i++) {
            let part = path[i];
            let next = parent[part];
            if (!isObject(next)) { // if is not object, just override to a empty object
                next = {}; // create a new middle node
                parent[part] = next;
            }
            parent = next;
        }

        parent[path[path.length - 1]] = value; // set value
        return modifySuccess(path, value);
    };

    return {
        queryByPath,

        setByPath,

        removeByPath: (path) => {
            let parentPath = path.slice(0, path.length - 1);
            let lastKey = path[path.length - 1];
            let parent = queryByPath(parentPath);
            if (parent === missingValue || !isObject(parent) || !parent.hasOwnProperty(lastKey)) {
                return removeNoneExist(path);
            } else {
                delete parent[lastKey];
                return removeSuccess(path);
            }
        },

        appendByPath: (path, value) => {
            return setByPath(path.concat([autoId()]), value);
        }
    };
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/lib/util.js":
/*!********************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/lib/util.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");

let autoId = () => {
    let time = new Date().getTime(); // used to sort by time
    // generate id
    return `_gid_${time}_${uuidv4().replace(/-/g, '_')}`;
};

let isObject = v => v && typeof v === 'object';

const O_T_MODIFY = 'update';
const O_T_REMOVE = 'delete';
const T_SUCCESS = 'success';

const ERR_T_REMOVE_NONE_EXIST = 'remove_none_exist';

let modifySuccess = (path, value) => {
    return {
        operationType: O_T_MODIFY,
        resultType: T_SUCCESS,

        path,
        value: value && value.toString()
    };
};

let removeNoneExist = (path) => {
    return {
        operationType: O_T_REMOVE,
        resultType: ERR_T_REMOVE_NONE_EXIST,

        path
    };
};

let removeSuccess = (path) => {
    return {
        operationType: O_T_REMOVE,
        resultType: T_SUCCESS,

        path
    };
};

module.exports = {
    autoId,
    isObject,

    modifySuccess,
    removeNoneExist,
    removeSuccess
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/res/lr1Table.js":
/*!************************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/res/lr1Table.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={"GOTO":[{"PROGRAM":12,"EXPRESSION_LIST":13,"EXPRESSION":14,"CONDITION_EXPRESSION":15,"UPDATE_EXPRESSION":16,"QUERY_EXPRESSION":17,"PATH":18,"ATOM_DATA":19},{"PROGRAM":31,"EXPRESSION_LIST":32,"EXPRESSION":33,"CONDITION_EXPRESSION":34,"UPDATE_EXPRESSION":35,"QUERY_EXPRESSION":36,"PATH":37,"ATOM_DATA":38},{"PATH":41},{"PATH":44},{},{"PATH":46},{"PATH":47},{},{},{},{},{},{},{},{},{},{},{},{},{},{"PROGRAM":51,"EXPRESSION_LIST":32,"EXPRESSION":33,"CONDITION_EXPRESSION":34,"UPDATE_EXPRESSION":35,"QUERY_EXPRESSION":36,"PATH":37,"ATOM_DATA":38},{"PATH":54},{"PATH":55},{},{"PATH":57},{"PATH":58},{},{},{},{},{},{},{},{},{},{},{},{},{},{"PATH":63},{"PATH":64},{},{"PATH":65},{"PATH":66},{},{"QUERY_EXPRESSION":77,"QUERY_EXPRESSION_LIST":78,"PATH":79,"ATOM_DATA":80},{},{},{"EXPRESSION_LIST":81,"EXPRESSION":14,"CONDITION_EXPRESSION":15,"UPDATE_EXPRESSION":16,"QUERY_EXPRESSION":17,"PATH":18,"ATOM_DATA":19},{"EXPRESSION":93,"CONDITION_EXPRESSION":94,"UPDATE_EXPRESSION":95,"QUERY_EXPRESSION":96,"PATH":97,"ATOM_DATA":98},{"QUERY_EXPRESSION":99,"PATH":100,"ATOM_DATA":19},{},{"PATH":102},{"PATH":103},{},{},{"QUERY_EXPRESSION":77,"QUERY_EXPRESSION_LIST":106,"PATH":79,"ATOM_DATA":80},{},{},{},{"EXPRESSION_LIST":107,"EXPRESSION":33,"CONDITION_EXPRESSION":34,"UPDATE_EXPRESSION":35,"QUERY_EXPRESSION":36,"PATH":37,"ATOM_DATA":38},{"EXPRESSION":108,"CONDITION_EXPRESSION":94,"UPDATE_EXPRESSION":95,"QUERY_EXPRESSION":96,"PATH":97,"ATOM_DATA":98},{"QUERY_EXPRESSION":109,"PATH":110,"ATOM_DATA":38},{},{},{},{},{"QUERY_EXPRESSION":111,"PATH":100,"ATOM_DATA":19},{},{},{"PATH":113},{"PATH":114},{},{},{},{},{},{},{},{},{},{},{"PROGRAM":117,"EXPRESSION_LIST":32,"EXPRESSION":33,"CONDITION_EXPRESSION":34,"UPDATE_EXPRESSION":35,"QUERY_EXPRESSION":36,"PATH":37,"ATOM_DATA":38},{"PATH":120},{"PATH":121},{},{"PATH":123},{"PATH":124},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{"QUERY_EXPRESSION":128,"PATH":110,"ATOM_DATA":38},{},{},{},{},{},{},{},{"QUERY_EXPRESSION":77,"QUERY_EXPRESSION_LIST":132,"PATH":79,"ATOM_DATA":80},{},{},{"QUERY_EXPRESSION":77,"QUERY_EXPRESSION_LIST":133,"PATH":79,"ATOM_DATA":80},{},{},{"PATH":135},{"PATH":136},{},{},{"QUERY_EXPRESSION":77,"QUERY_EXPRESSION_LIST":139,"PATH":79,"ATOM_DATA":80},{},{},{"EXPRESSION":140,"CONDITION_EXPRESSION":94,"UPDATE_EXPRESSION":95,"QUERY_EXPRESSION":96,"PATH":97,"ATOM_DATA":98},{"EXPRESSION":141,"CONDITION_EXPRESSION":15,"UPDATE_EXPRESSION":16,"QUERY_EXPRESSION":17,"PATH":18,"ATOM_DATA":19},{"QUERY_EXPRESSION":142,"PATH":143,"ATOM_DATA":98},{},{},{"EXPRESSION":144,"CONDITION_EXPRESSION":34,"UPDATE_EXPRESSION":35,"QUERY_EXPRESSION":36,"PATH":37,"ATOM_DATA":38},{},{},{},{},{},{},{"QUERY_EXPRESSION":146,"PATH":143,"ATOM_DATA":98},{},{},{},{},{},{},{},{},{},{},{"EXPRESSION":149,"CONDITION_EXPRESSION":94,"UPDATE_EXPRESSION":95,"QUERY_EXPRESSION":96,"PATH":97,"ATOM_DATA":98},{}],"ACTION":[{"$":{"type":"reduce","production":["EXPRESSION",[]]},"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":1},"variableName":{"type":"shift","state":4},"delete":{"type":"shift","state":2},"append":{"type":"shift","state":3},"true":{"type":"shift","state":7},"false":{"type":"shift","state":8},"null":{"type":"shift","state":9},"string":{"type":"shift","state":10},"number":{"type":"shift","state":11},"nodeName":{"type":"shift","state":5},"nodeNameVariable":{"type":"shift","state":6}},{"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":20},"variableName":{"type":"shift","state":23},"delete":{"type":"shift","state":21},"append":{"type":"shift","state":22},"true":{"type":"shift","state":26},"false":{"type":"shift","state":27},"null":{"type":"shift","state":28},"string":{"type":"shift","state":29},"number":{"type":"shift","state":30},"nodeName":{"type":"shift","state":24},"nodeNameVariable":{"type":"shift","state":25}},{"nodeName":{"type":"shift","state":39},"nodeNameVariable":{"type":"shift","state":40}},{"nodeName":{"type":"shift","state":42},"nodeNameVariable":{"type":"shift","state":43}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":45}},{"$":{"type":"reduce","production":["PATH",["nodeName"]]},"assign":{"type":"reduce","production":["PATH",["nodeName"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":5},"nodeNameVariable":{"type":"shift","state":6}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"assign":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":5},"nodeNameVariable":{"type":"shift","state":6}},{"$":{"type":"reduce","production":["ATOM_DATA",["true"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["true"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["false"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["false"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["null"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["null"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["string"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["string"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["number"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["number"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"$":{"type":"accept"}},{"$":{"type":"reduce","production":["PROGRAM",["EXPRESSION_LIST"]]}},{"$":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION"]]},"semicolon":{"type":"shift","state":48},"questionMark":{"type":"shift","state":49}},{"$":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]}},{"$":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]}},{"$":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"assign":{"type":"shift","state":50}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":20},"variableName":{"type":"shift","state":23},"delete":{"type":"shift","state":21},"append":{"type":"shift","state":22},"true":{"type":"shift","state":26},"false":{"type":"shift","state":27},"null":{"type":"shift","state":28},"string":{"type":"shift","state":29},"number":{"type":"shift","state":30},"nodeName":{"type":"shift","state":24},"nodeNameVariable":{"type":"shift","state":25}},{"nodeName":{"type":"shift","state":52},"nodeNameVariable":{"type":"shift","state":53}},{"nodeName":{"type":"shift","state":42},"nodeNameVariable":{"type":"shift","state":43}},{"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"rightBrace":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":56}},{"assign":{"type":"reduce","production":["PATH",["nodeName"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":24},"nodeNameVariable":{"type":"shift","state":25}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":24},"nodeNameVariable":{"type":"shift","state":25}},{"questionMark":{"type":"reduce","production":["ATOM_DATA",["true"]]},"rightBrace":{"type":"reduce","production":["ATOM_DATA",["true"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"questionMark":{"type":"reduce","production":["ATOM_DATA",["false"]]},"rightBrace":{"type":"reduce","production":["ATOM_DATA",["false"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"questionMark":{"type":"reduce","production":["ATOM_DATA",["null"]]},"rightBrace":{"type":"reduce","production":["ATOM_DATA",["null"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"questionMark":{"type":"reduce","production":["ATOM_DATA",["string"]]},"rightBrace":{"type":"reduce","production":["ATOM_DATA",["string"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"questionMark":{"type":"reduce","production":["ATOM_DATA",["number"]]},"rightBrace":{"type":"reduce","production":["ATOM_DATA",["number"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"rightBrace":{"type":"shift","state":59}},{"rightBrace":{"type":"reduce","production":["PROGRAM",["EXPRESSION_LIST"]]}},{"rightBrace":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION"]]},"semicolon":{"type":"shift","state":60},"questionMark":{"type":"shift","state":61}},{"questionMark":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]}},{"questionMark":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]}},{"questionMark":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]}},{"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"rightBrace":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"assign":{"type":"shift","state":62}},{"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"rightBrace":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"$":{"type":"reduce","production":["PATH",["nodeName"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":39},"nodeNameVariable":{"type":"shift","state":40}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":39},"nodeNameVariable":{"type":"shift","state":40}},{"$":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]},"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":42},"nodeNameVariable":{"type":"shift","state":43}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":42},"nodeNameVariable":{"type":"shift","state":43}},{"assign":{"type":"shift","state":67}},{"rightBracket":{"type":"shift","state":69},"variableName":{"type":"shift","state":68},"true":{"type":"shift","state":72},"false":{"type":"shift","state":73},"null":{"type":"shift","state":74},"string":{"type":"shift","state":75},"number":{"type":"shift","state":76},"nodeName":{"type":"shift","state":70},"nodeNameVariable":{"type":"shift","state":71}},{"$":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"assign":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"assign":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"$":{"type":"reduce","production":["EXPRESSION",[]]},"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":1},"variableName":{"type":"shift","state":4},"delete":{"type":"shift","state":2},"append":{"type":"shift","state":3},"true":{"type":"shift","state":7},"false":{"type":"shift","state":8},"null":{"type":"shift","state":9},"string":{"type":"shift","state":10},"number":{"type":"shift","state":11},"nodeName":{"type":"shift","state":5},"nodeNameVariable":{"type":"shift","state":6}},{"colon":{"type":"reduce","production":["EXPRESSION",[]]},"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":82},"variableName":{"type":"shift","state":85},"delete":{"type":"shift","state":83},"append":{"type":"shift","state":84},"true":{"type":"shift","state":88},"false":{"type":"shift","state":89},"null":{"type":"shift","state":90},"string":{"type":"shift","state":91},"number":{"type":"shift","state":92},"nodeName":{"type":"shift","state":86},"nodeNameVariable":{"type":"shift","state":87}},{"variableName":{"type":"shift","state":4},"true":{"type":"shift","state":7},"false":{"type":"shift","state":8},"null":{"type":"shift","state":9},"string":{"type":"shift","state":10},"number":{"type":"shift","state":11},"nodeName":{"type":"shift","state":39},"nodeNameVariable":{"type":"shift","state":40}},{"rightBrace":{"type":"shift","state":101}},{"questionMark":{"type":"reduce","production":["PATH",["nodeName"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":52},"nodeNameVariable":{"type":"shift","state":53}},{"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":52},"nodeNameVariable":{"type":"shift","state":53}},{"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]},"rightBrace":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]}},{"assign":{"type":"shift","state":104}},{"rightBracket":{"type":"shift","state":105},"variableName":{"type":"shift","state":68},"true":{"type":"shift","state":72},"false":{"type":"shift","state":73},"null":{"type":"shift","state":74},"string":{"type":"shift","state":75},"number":{"type":"shift","state":76},"nodeName":{"type":"shift","state":70},"nodeNameVariable":{"type":"shift","state":71}},{"assign":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"$":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]}},{"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":20},"variableName":{"type":"shift","state":23},"delete":{"type":"shift","state":21},"append":{"type":"shift","state":22},"true":{"type":"shift","state":26},"false":{"type":"shift","state":27},"null":{"type":"shift","state":28},"string":{"type":"shift","state":29},"number":{"type":"shift","state":30},"nodeName":{"type":"shift","state":24},"nodeNameVariable":{"type":"shift","state":25}},{"colon":{"type":"reduce","production":["EXPRESSION",[]]},"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":82},"variableName":{"type":"shift","state":85},"delete":{"type":"shift","state":83},"append":{"type":"shift","state":84},"true":{"type":"shift","state":88},"false":{"type":"shift","state":89},"null":{"type":"shift","state":90},"string":{"type":"shift","state":91},"number":{"type":"shift","state":92},"nodeName":{"type":"shift","state":86},"nodeNameVariable":{"type":"shift","state":87}},{"variableName":{"type":"shift","state":23},"true":{"type":"shift","state":26},"false":{"type":"shift","state":27},"null":{"type":"shift","state":28},"string":{"type":"shift","state":29},"number":{"type":"shift","state":30},"nodeName":{"type":"shift","state":52},"nodeNameVariable":{"type":"shift","state":53}},{"$":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"variableName":{"type":"shift","state":4},"true":{"type":"shift","state":7},"false":{"type":"shift","state":8},"null":{"type":"shift","state":9},"string":{"type":"shift","state":10},"number":{"type":"shift","state":11},"nodeName":{"type":"shift","state":39},"nodeNameVariable":{"type":"shift","state":40}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":112}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"comma":{"type":"reduce","production":["PATH",["nodeName"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":70},"nodeNameVariable":{"type":"shift","state":71}},{"comma":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":70},"nodeNameVariable":{"type":"shift","state":71}},{"comma":{"type":"reduce","production":["ATOM_DATA",["true"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["false"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["null"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["string"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["number"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION_LIST",["QUERY_EXPRESSION"]]},"comma":{"type":"shift","state":115}},{"rightBracket":{"type":"shift","state":116}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"$":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION","semicolon","EXPRESSION_LIST"]]}},{"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":20},"variableName":{"type":"shift","state":23},"delete":{"type":"shift","state":21},"append":{"type":"shift","state":22},"true":{"type":"shift","state":26},"false":{"type":"shift","state":27},"null":{"type":"shift","state":28},"string":{"type":"shift","state":29},"number":{"type":"shift","state":30},"nodeName":{"type":"shift","state":24},"nodeNameVariable":{"type":"shift","state":25}},{"nodeName":{"type":"shift","state":118},"nodeNameVariable":{"type":"shift","state":119}},{"nodeName":{"type":"shift","state":42},"nodeNameVariable":{"type":"shift","state":43}},{"colon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":122}},{"assign":{"type":"reduce","production":["PATH",["nodeName"]]},"colon":{"type":"reduce","production":["PATH",["nodeName"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":86},"nodeNameVariable":{"type":"shift","state":87}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"colon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":86},"nodeNameVariable":{"type":"shift","state":87}},{"colon":{"type":"reduce","production":["ATOM_DATA",["true"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"colon":{"type":"reduce","production":["ATOM_DATA",["false"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"colon":{"type":"reduce","production":["ATOM_DATA",["null"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"colon":{"type":"reduce","production":["ATOM_DATA",["string"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"colon":{"type":"reduce","production":["ATOM_DATA",["number"]]},"questionMark":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"colon":{"type":"shift","state":126},"questionMark":{"type":"shift","state":125}},{"colon":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["CONDITION_EXPRESSION"]]}},{"colon":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]}},{"colon":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]}},{"colon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"assign":{"type":"shift","state":127}},{"colon":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"$":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"questionMark":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]}},{"questionMark":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"rightBrace":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"variableName":{"type":"shift","state":23},"true":{"type":"shift","state":26},"false":{"type":"shift","state":27},"null":{"type":"shift","state":28},"string":{"type":"shift","state":29},"number":{"type":"shift","state":30},"nodeName":{"type":"shift","state":52},"nodeNameVariable":{"type":"shift","state":53}},{"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"rightBrace":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"rightBracket":{"type":"shift","state":129}},{"rightBrace":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION","semicolon","EXPRESSION_LIST"]]}},{"colon":{"type":"shift","state":130},"questionMark":{"type":"shift","state":125}},{"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]},"rightBrace":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]}},{"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"rightBrace":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"$":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]}},{"rightBracket":{"type":"shift","state":131},"variableName":{"type":"shift","state":68},"true":{"type":"shift","state":72},"false":{"type":"shift","state":73},"null":{"type":"shift","state":74},"string":{"type":"shift","state":75},"number":{"type":"shift","state":76},"nodeName":{"type":"shift","state":70},"nodeNameVariable":{"type":"shift","state":71}},{"comma":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"comma":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"variableName":{"type":"shift","state":68},"true":{"type":"shift","state":72},"false":{"type":"shift","state":73},"null":{"type":"shift","state":74},"string":{"type":"shift","state":75},"number":{"type":"shift","state":76},"nodeName":{"type":"shift","state":70},"nodeNameVariable":{"type":"shift","state":71}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}},{"rightBrace":{"type":"shift","state":134}},{"colon":{"type":"reduce","production":["PATH",["nodeName"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":118},"nodeNameVariable":{"type":"shift","state":119}},{"colon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":118},"nodeNameVariable":{"type":"shift","state":119}},{"colon":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]},"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]}},{"assign":{"type":"shift","state":137}},{"rightBracket":{"type":"shift","state":138},"variableName":{"type":"shift","state":68},"true":{"type":"shift","state":72},"false":{"type":"shift","state":73},"null":{"type":"shift","state":74},"string":{"type":"shift","state":75},"number":{"type":"shift","state":76},"nodeName":{"type":"shift","state":70},"nodeNameVariable":{"type":"shift","state":71}},{"assign":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"colon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"colon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"colon":{"type":"reduce","production":["EXPRESSION",[]]},"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":82},"variableName":{"type":"shift","state":85},"delete":{"type":"shift","state":83},"append":{"type":"shift","state":84},"true":{"type":"shift","state":88},"false":{"type":"shift","state":89},"null":{"type":"shift","state":90},"string":{"type":"shift","state":91},"number":{"type":"shift","state":92},"nodeName":{"type":"shift","state":86},"nodeNameVariable":{"type":"shift","state":87}},{"$":{"type":"reduce","production":["EXPRESSION",[]]},"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":1},"variableName":{"type":"shift","state":4},"delete":{"type":"shift","state":2},"append":{"type":"shift","state":3},"true":{"type":"shift","state":7},"false":{"type":"shift","state":8},"null":{"type":"shift","state":9},"string":{"type":"shift","state":10},"number":{"type":"shift","state":11},"nodeName":{"type":"shift","state":5},"nodeNameVariable":{"type":"shift","state":6}},{"variableName":{"type":"shift","state":85},"true":{"type":"shift","state":88},"false":{"type":"shift","state":89},"null":{"type":"shift","state":90},"string":{"type":"shift","state":91},"number":{"type":"shift","state":92},"nodeName":{"type":"shift","state":118},"nodeNameVariable":{"type":"shift","state":119}},{"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]},"rightBrace":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]}},{"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"rightBrace":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}},{"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"rightBrace":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":20},"variableName":{"type":"shift","state":23},"delete":{"type":"shift","state":21},"append":{"type":"shift","state":22},"true":{"type":"shift","state":26},"false":{"type":"shift","state":27},"null":{"type":"shift","state":28},"string":{"type":"shift","state":29},"number":{"type":"shift","state":30},"nodeName":{"type":"shift","state":24},"nodeNameVariable":{"type":"shift","state":25}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"rightBracket":{"type":"shift","state":145}},{"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION_LIST",["QUERY_EXPRESSION","comma","QUERY_EXPRESSION_LIST"]]}},{"colon":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]},"questionMark":{"type":"reduce","production":["EXPRESSION",["leftBrace","PROGRAM","rightBrace"]]}},{"colon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"colon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"questionMark":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"variableName":{"type":"shift","state":85},"true":{"type":"shift","state":88},"false":{"type":"shift","state":89},"null":{"type":"shift","state":90},"string":{"type":"shift","state":91},"number":{"type":"shift","state":92},"nodeName":{"type":"shift","state":118},"nodeNameVariable":{"type":"shift","state":119}},{"colon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"rightBracket":{"type":"shift","state":147}},{"colon":{"type":"shift","state":148},"questionMark":{"type":"shift","state":125}},{"$":{"type":"reduce","production":["CONDITION_EXPRESSION",["EXPRESSION","questionMark","EXPRESSION","colon","EXPRESSION"]]},"questionMark":{"type":"shift","state":49},"semicolon":{"type":"reduce","production":["CONDITION_EXPRESSION",["EXPRESSION","questionMark","EXPRESSION","colon","EXPRESSION"]]}},{"colon":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]}},{"colon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"questionMark":{"type":"shift","state":61},"rightBrace":{"type":"reduce","production":["CONDITION_EXPRESSION",["EXPRESSION","questionMark","EXPRESSION","colon","EXPRESSION"]]},"semicolon":{"type":"reduce","production":["CONDITION_EXPRESSION",["EXPRESSION","questionMark","EXPRESSION","colon","EXPRESSION"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}},{"colon":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]},"questionMark":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]}},{"colon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"questionMark":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}},{"colon":{"type":"reduce","production":["EXPRESSION",[]]},"questionMark":{"type":"reduce","production":["EXPRESSION",[]]},"leftBrace":{"type":"shift","state":82},"variableName":{"type":"shift","state":85},"delete":{"type":"shift","state":83},"append":{"type":"shift","state":84},"true":{"type":"shift","state":88},"false":{"type":"shift","state":89},"null":{"type":"shift","state":90},"string":{"type":"shift","state":91},"number":{"type":"shift","state":92},"nodeName":{"type":"shift","state":86},"nodeNameVariable":{"type":"shift","state":87}},{"colon":{"type":"reduce","production":["CONDITION_EXPRESSION",["EXPRESSION","questionMark","EXPRESSION","colon","EXPRESSION"]]},"questionMark":{"type":"shift","state":125}}]}

/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/const.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/src/const.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    P_PROGRAM: 'PROGRAM := EXPRESSION_LIST',

    P_EXPRESSION_LIST_0: 'EXPRESSION_LIST := EXPRESSION',
    P_EXPRESSION_LIST_1: 'EXPRESSION_LIST := EXPRESSION semicolon EXPRESSION_LIST',

    P_EXPRESSION_0: 'EXPRESSION := QUERY_EXPRESSION',
    P_EXPRESSION_1: 'EXPRESSION := UPDATE_EXPRESSION',
    P_EXPRESSION_2: 'EXPRESSION := ',
    P_EXPRESSION_3: 'EXPRESSION := leftBrace PROGRAM rightBrace',
    P_EXPRESSION_4: 'EXPRESSION := CONDITION_EXPRESSION',

    P_CONDITION_EXPRESSION: 'CONDITION_EXPRESSION := EXPRESSION questionMark EXPRESSION colon EXPRESSION',

    P_UPDATE_EXPRESSION_0: 'UPDATE_EXPRESSION := PATH assign QUERY_EXPRESSION',
    P_UPDATE_EXPRESSION_1: 'UPDATE_EXPRESSION := delete PATH',
    P_UPDATE_EXPRESSION_2: 'UPDATE_EXPRESSION := append PATH assign QUERY_EXPRESSION',

    P_QUERY_EXPRESSION_0: 'QUERY_EXPRESSION := ATOM_DATA',
    P_QUERY_EXPRESSION_1: 'QUERY_EXPRESSION := variableName',
    P_QUERY_EXPRESSION_2: 'QUERY_EXPRESSION := PATH',
    P_QUERY_EXPRESSION_3: 'QUERY_EXPRESSION := variableName leftBracket rightBracket',
    P_QUERY_EXPRESSION_4: 'QUERY_EXPRESSION := variableName leftBracket QUERY_EXPRESSION_LIST rightBracket',

    P_QUERY_EXPRESSION_LIST_0: 'QUERY_EXPRESSION_LIST := QUERY_EXPRESSION',
    P_QUERY_EXPRESSION_LIST_1: 'QUERY_EXPRESSION_LIST := QUERY_EXPRESSION comma QUERY_EXPRESSION_LIST',

    P_PATH_0: 'PATH := nodeName',
    P_PATH_1: 'PATH := nodeName PATH',
    P_PATH_2: 'PATH := nodeNameVariable',
    P_PATH_3: 'PATH := nodeNameVariable PATH',

    P_ATOM_DATA_0: 'ATOM_DATA := true',
    P_ATOM_DATA_1: 'ATOM_DATA := false',
    P_ATOM_DATA_2: 'ATOM_DATA := null',
    P_ATOM_DATA_3: 'ATOM_DATA := string',
    P_ATOM_DATA_4: 'ATOM_DATA := number',

    T_EXPRESSION_LIST: 'expresionList',
    T_CONDITION: 'condition',
    T_ATOM: 'atom',
    T_PATH: 'path',
    T_FUNCTION: 'function',
    T_VARIABLE_NAME: 'variableName',
    T_ASSIGN: 'assign',
    T_DELETE: 'delete',
    T_APPEND: 'append',
    T_NODE_NAME: 'nodeName',
    T_NODE_NAME_VARIABLE: 'nodeNameVariable',

    A_DEFAULT: 'default'
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/src/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const parser = __webpack_require__(/*! ./parser */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/parser.js");
const {
    checkAST,
    runTimeCheck,
    getVariable
} = __webpack_require__(/*! ./stub */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/stub.js");

const {
    T_CONDITION,
    T_ATOM,
    T_PATH,
    T_ASSIGN,
    T_DELETE,
    T_APPEND,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_NODE_NAME,
    T_NODE_NAME_VARIABLE,
    T_EXPRESSION_LIST
} = __webpack_require__(/*! ./const */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/const.js");

const executeAST = (ast, {
    queryByPath,
    setByPath,
    removeByPath,
    appendByPath,
    variableMap = {},
    variableStub = {},
    skipCheck = false
}) => {
    // TODO check params
    // check variableStub

    if (!skipCheck) {
        runTimeCheck(variableStub, variableMap);
    }

    let open = [{
        node: ast,
        visited: false
    }];
    let valueStack = [];

    while (open.length) {
        let top = open[open.length - 1];
        let topNode = top.node;

        if (topNode.type === T_EXPRESSION_LIST) {
            if (top.visited) {
                // get value from value stack
                let expValues = [];
                for (let i = 0; i < topNode.value.length; i++) {
                    expValues.unshift(valueStack.pop());
                }
                valueStack.push(expValues[expValues.length - 1]);
                open.pop();
            } else {
                top.visited = true;
                for (let i = topNode.value.length - 1; i >= 0; i--) {
                    open.push({
                        node: topNode.value[i],
                        visited: false
                    });
                }
            }
        } else if (topNode.type === T_CONDITION) {
            const {
                condition,
                branch1,
                branch2
            } = topNode.value;
            // resolve condition and then decide to run which branch
            if (top.visited === false) {
                top.visited = 'condition';
                open.push({
                    node: condition,
                    visited: false
                });
            } else if (top.visited === 'condition') {
                top.visited = 'branch';
                const conditionRet = valueStack.pop();
                if (conditionRet) {
                    open.push({
                        node: branch1,
                        visited: false
                    });
                } else {
                    open.push({
                        node: branch2,
                        visited: false
                    });
                }
            } else if (top.visited === 'branch') {
                open.pop();
            }
        } else if (topNode.type === T_ATOM) {
            valueStack.push(topNode.value);
            open.pop();
        } else if (topNode.type === T_VARIABLE_NAME) { // pickup variable
            let variableName = topNode.value;
            let variableValue = getVariable(variableName, variableMap, variableStub);
            valueStack.push(variableValue);
            open.pop();
        } else if (topNode.type === T_PATH) {
            valueStack.push(queryByPath(resolvePath(topNode.value, variableMap)));
            open.pop();
        } else if (topNode.type === T_FUNCTION) {
            let {
                funName,
                params
            } = topNode.value;

            if (top.visited) {
                // get value from value stack
                let paramValues = [];
                for (let i = 0; i < params.length; i++) {
                    paramValues.push(valueStack.pop());
                }
                // TODO missing funName as function exception
                valueStack.push(variableMap[funName](...paramValues));
                open.pop();
            } else {
                top.visited = true;
                for (let i = 0; i < params.length; i++) {
                    open.push({
                        node: params[i],
                        visited: false
                    });
                }
            }
        } else if (topNode.type === T_ASSIGN) {
            let {
                path,
                value
            } = topNode.value;

            if (top.visited) {
                let assignValue = valueStack.pop();
                valueStack.push(setByPath(resolvePath(path.value, variableMap), assignValue));
                open.pop();
            } else {
                top.visited = true;
                open.push({
                    node: value,
                    visited: false
                });
            }
        } else if (topNode.type === T_DELETE) {
            let {
                path
            } = topNode.value;

            valueStack.push(removeByPath(resolvePath(path.value, variableMap)));
            open.pop();
        } else if (topNode.type === T_APPEND) {
            let {
                path,
                value
            } = topNode.value;

            if (top.visited) {
                let assignValue = valueStack.pop();
                valueStack.push(appendByPath(resolvePath(path.value, variableMap), assignValue));
                open.pop();
            } else {
                top.visited = true;
                open.push({
                    node: value,
                    visited: false
                });
            }
        }
    }

    return valueStack[valueStack.length - 1];
};

let resolvePath = (path, variableMap) => {
    let ret = [];
    for (let i = 0; i < path.length; i++) {
        let {
            type,
            value
        } = path[i];
        if (type === T_NODE_NAME) {
            ret.push(value);
        } else if (type === T_NODE_NAME_VARIABLE) {
            ret.push(variableMap[value]);
        }
    }

    return ret;
};

let parseStrToAst = (str) => {
    let handleChunk = parser();
    if (str) {
        handleChunk(str);
    }
    return handleChunk(null);
};

module.exports = {
    parser,
    parseStrToAst,
    executeAST,
    checkAST
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/parser.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/src/parser.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const streamTokenSpliter = __webpack_require__(/*! stream-token-parser */ "./node_modules/stream-token-parser/index.js");
const {
    LR
} = __webpack_require__(/*! syntaxer */ "./node_modules/syntaxer/index.js");
const {
    getProductionId,
    processTokens,
} = __webpack_require__(/*! ./util */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/util.js");
const tokenTypes = __webpack_require__(/*! ../grammer/tokenTypes */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/grammer/tokenTypes.js");
const {
    ACTION,
    GOTO
} = __webpack_require__(/*! ../res/lr1Table */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/res/lr1Table.js");

const {
    P_PROGRAM,

    P_EXPRESSION_LIST_0,
    P_EXPRESSION_LIST_1,

    P_EXPRESSION_0,
    P_EXPRESSION_1,
    P_EXPRESSION_2,
    P_EXPRESSION_3,
    P_EXPRESSION_4,

    P_CONDITION_EXPRESSION,

    P_UPDATE_EXPRESSION_0,
    P_UPDATE_EXPRESSION_1,
    P_UPDATE_EXPRESSION_2,

    P_QUERY_EXPRESSION_0,
    P_QUERY_EXPRESSION_1,
    P_QUERY_EXPRESSION_2,
    P_QUERY_EXPRESSION_3,
    P_QUERY_EXPRESSION_4,

    P_QUERY_EXPRESSION_LIST_0,
    P_QUERY_EXPRESSION_LIST_1,

    P_PATH_0,
    P_PATH_1,
    P_PATH_2,
    P_PATH_3,

    P_ATOM_DATA_0,
    P_ATOM_DATA_1,
    P_ATOM_DATA_2,
    P_ATOM_DATA_3,
    P_ATOM_DATA_4,

    T_EXPRESSION_LIST,
    T_CONDITION,
    T_ATOM,
    T_PATH,
    T_ASSIGN,
    T_DELETE,
    T_APPEND,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_NODE_NAME,
    T_NODE_NAME_VARIABLE
} = __webpack_require__(/*! ./const */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/const.js");

module.exports = () => {
    let tokenSpliter = streamTokenSpliter.parser(tokenTypes);

    // TODO optimization AST
    let lrParse = LR(ACTION, GOTO, {
        // when reduce prodcution, translate at the sametime
        reduceHandler: (production, midNode) => {
            switch (getProductionId(production)) {
                case P_PROGRAM:
                    midNode.value = {
                        type: T_EXPRESSION_LIST,
                        value: midNode.children[0].value
                    };
                    break;

                case P_EXPRESSION_LIST_0:
                    midNode.value = midNode.children[0].value === null ? [] : [midNode.children[0].value];
                    break;

                case P_EXPRESSION_LIST_1:
                    midNode.value = (midNode.children[0].value === null ? [] : [midNode.children[0].value]).concat(midNode.children[2].value);
                    break;

                case P_EXPRESSION_0:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_EXPRESSION_1:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_EXPRESSION_2: // empty situation
                    midNode.value = null;
                    break;

                case P_EXPRESSION_3: // {program}
                    midNode.value = midNode.children[1].value;
                    break;
                case P_EXPRESSION_4:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_CONDITION_EXPRESSION:
                    midNode.value = {
                        type: T_CONDITION,
                        value: {
                            condition: midNode.children[0].value,
                            branch1: midNode.children[2].value,
                            branch2: midNode.children[4].value
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_0:
                    midNode.value = {
                        type: T_ASSIGN,
                        value: {
                            path: midNode.children[0].value,
                            value: midNode.children[2].value
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_1:
                    midNode.value = {
                        type: T_DELETE,
                        value: {
                            path: midNode.children[1].value,
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_2:
                    midNode.value = {
                        type: T_APPEND,
                        value: {
                            path: midNode.children[1].value,
                            value: midNode.children[3].value
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_0:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_QUERY_EXPRESSION_1:
                    midNode.value = {
                        type: T_VARIABLE_NAME,
                        value: midNode.children[0].token.text
                    };
                    break;

                case P_QUERY_EXPRESSION_2:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_QUERY_EXPRESSION_3:
                    midNode.value = {
                        type: T_FUNCTION,
                        value: {
                            funName: midNode.children[0].token.text,
                            params: []
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_4:
                    midNode.value = {
                        type: 'function',
                        value: {
                            funName: midNode.children[0].token.text,
                            params: midNode.children[2].value
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_LIST_0:
                    midNode.value = [midNode.children[0].value];
                    break;

                case P_QUERY_EXPRESSION_LIST_1:
                    midNode.value = [midNode.children[0].value].concat(midNode.children[2].value);
                    break;

                case P_PATH_0:
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME,
                            value: midNode.children[0].token.text.substring(1)
                        }]
                    };
                    break;

                case P_PATH_1:
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME,
                            value: midNode.children[0].token.text.substring(1)
                        }].concat(midNode.children[1].value.value)
                    };
                    break;

                case P_PATH_2:
                    var nodeNameVarTxt = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME_VARIABLE,
                            value: nodeNameVarTxt.substring(2, nodeNameVarTxt.length - 1).trim()
                        }]
                    };
                    break;

                case P_PATH_3:
                    var nodeNameVarTxt2 = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME_VARIABLE,
                            value: nodeNameVarTxt2.substring(2, nodeNameVarTxt2.length - 1).trim()
                        }].concat(midNode.children[1].value.value)
                    };
                    break;

                case P_ATOM_DATA_0:
                    midNode.value = {
                        type: T_ATOM,
                        value: true
                    };
                    break;

                case P_ATOM_DATA_1:
                    midNode.value = {
                        type: T_ATOM,
                        value: false
                    };
                    break;

                case P_ATOM_DATA_2:
                    midNode.value = {
                        type: T_ATOM,
                        value: null
                    };
                    break;

                case P_ATOM_DATA_3:
                    var text = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_ATOM,
                        value: JSON.parse(text)
                    };
                    break;

                case P_ATOM_DATA_4:
                    var numText = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_ATOM,
                        value: Number(numText)
                    };
                    break;
            }
        }
    });

    // handle chunk data
    return (chunk) => {
        let str = chunk && chunk.toString();
        let tokens = processTokens(tokenSpliter(str));

        for (let i = 0; i < tokens.length; i++) {
            lrParse(tokens[i]);
        }

        // means finished chunks
        if (chunk === null) {
            let ast = lrParse(null);
            return ast.children[0].value;
        }
    };
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/stub.js":
/*!********************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/src/stub.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



// TODO reuse pfc-compiler

const {
    isObject,
    isFunction,
    isString
} = __webpack_require__(/*! ./util */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/util.js");

const {
    T_ASSIGN,
    T_DELETE,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_PATH,
    T_NODE_NAME_VARIABLE,
    T_EXPRESSION_LIST,
    T_CONDITION,

    A_DEFAULT
} = __webpack_require__(/*! ./const */ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/const.js");

/**
 *
 * variableStub = {
 *    [variableName]: {
 *       type,
 *       default,  // default value of variable
 *       validate // function used to check dynamic
 *    }
 * }
 *
 *
 * TODO restraints checking
 */

// static check
let checkAST = (ast, {
    variableStub = {}
} = {}) => {
    let open = [ast];

    while (open.length) {
        let top = open.pop();
        let midType = top.type;

        if (midType === T_EXPRESSION_LIST) {
            for (let i = 0; i < top.value.length; i++) {
                open.unshift(top.value[i]);
            }
        } else if (midType === T_CONDITION) {
            open.push(top.value.condition);
            open.push(top.value.branch1);
            open.push(top.value.branch2);
        } else if (midType === T_VARIABLE_NAME) {
            let varName = top.value;
            // must exist
            if (!variableStub.hasOwnProperty(varName)) {
                throw new Error(`missing variable ${varName} in [${Object.keys(variableStub).join(', ')}]`);
            }
        } else if (midType === T_FUNCTION) { // function
            let {
                funName,
                params
            } = top.value;
            let stub = variableStub[funName];
            if (!isObject(stub) || stub.type !== T_FUNCTION) {
                throw new Error(`missing function ${funName}, please check your variable map. Current variable map has keys [${Object.keys(variableStub).join(', ')}].`);
            }
            // push params
            let paramLen = params.length;
            for (let i = 0; i < paramLen; i++) {
                open.push(params[i]);
            }
        } else if (midType === T_ASSIGN) {
            open.push(top.value.path);
            open.push(top.value.value);
        } else if (midType === T_DELETE) {
            open.push(top.value.path);
        } else if (midType === T_PATH) {
            let path = top.value;
            for (let i = 0; i < path.length; i++) {
                let {
                    type,
                    value
                } = path[i];
                if (type === T_NODE_NAME_VARIABLE) {
                    let stub = variableStub[value];

                    if (!isObject(stub) || stub.type !== T_NODE_NAME_VARIABLE) {
                        throw new Error(`missing type attribute ${T_NODE_NAME_VARIABLE} for ${value}, please check your variable map. Current variable map has keys [${Object.keys(variableStub).join(', ')}].`);
                    }
                }
            }
        }
    }
};

let runTimeCheck = (variableStub, variableMap) => {
    for (let name in variableStub) {
        let stub = variableStub[name];
        // missing check
        if (!variableMap.hasOwnProperty(name) && !stub.hasOwnProperty(A_DEFAULT)) {
            throw new Error(`missing variable ${name} in variableMap whick keys are [${Object.keys(variableMap).join(', ')}].`);
        }

        // type match
        if (stub.type === T_FUNCTION && !isFunction(variableMap[name])) {
            throw new Error(`variable ${name} is not function as expected, please check your variable map. Current variable map has keys [${Object.keys(variableMap).join(', ')}].`);
        }

        if (stub.type === T_NODE_NAME_VARIABLE && !isString(variableMap[name])) {
            throw new Error(`variable ${name} is not string as expected, please check your variable map. Current variable map has keys [${Object.keys(variableMap).join(', ')}].`);
        }
    }
};

let getVariable = (name, variableMap, variableStub) => {
    let stub = variableStub[name] || {};
    let value = null;
    if (variableMap.hasOwnProperty(name)) {
        value = variableMap[name];
    } else {
        // try to using default
        if (!stub.hasOwnProperty(A_DEFAULT)) {
            throw new Error(`missing variable ${name}.`);
        } else {
            value = stub[A_DEFAULT];
        }
    }

    if (isObject(stub) && isFunction(stub.validate)) { // dynamic validation
        stub.validate(value);
    }

    return value;
};

module.exports = {
    checkAST,
    runTimeCheck,
    getVariable
};


/***/ }),

/***/ "./node_modules/kabanery-signal-flow/node_modules/tree-script/src/util.js":
/*!********************************************************************************!*\
  !*** ./node_modules/kabanery-signal-flow/node_modules/tree-script/src/util.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

let getProductionId = (production) => {
    return `${production[0]} := ${production[1].join(' ')}`;
};

// ignore whitespace
let processTokens = (rawTokens) => {
    let tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
        let {
            text,
            tokenType
        } = rawTokens[i];

        let name = tokenType.name;

        if (name !== 'whitespace') { // ignore white space
            tokens.push({
                text,
                name
            });
        }
    }

    return tokens;
};

let isObject = v => v && typeof v === 'object';

let isFunction = v => typeof v === 'function';

let isString = v => typeof v === 'string';

module.exports = {
    getProductionId,
    processTokens,
    isObject,
    isFunction,
    isString
};


/***/ }),

/***/ "./node_modules/kabanery-spa/index.js":
/*!********************************************!*\
  !*** ./node_modules/kabanery-spa/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./src */ "./node_modules/kabanery-spa/src/index.js");

/**
 * @readme-quick-run
 *
 * ## test tar=js env=browser r_c=spa
 *
 * let {router, queryPager} = spa;
 * let {n, mount} = require('kabanery');
 * mount(n('div id="pager"'), document.body); // pager as contauner
 *
 * let {forward} = router(queryPager({
 *      'page1': {
 *          title: 'page1',
 *          render: () => {
 *              return n('div', 'this is page1');
 *          }
 *      },
 *      'page2': {
 *          render: () => {
 *              return n('div', 'this is page2');
 *          }
 *      }
 * }, 'page1')); // default page is page1
 *
 * module.exports = forward(window.location.href).then(() => {
 *    console.log('page 1 content: ');
 *    console.log(document.getElementById('pager').innerHTML);
 *    return forward('?page=page2').then(() => {
 *      console.log('\n\npage 2 content: ');
 *      console.log(document.getElementById('pager').innerHTML);
 *    });
 * });
 */


/***/ }),

/***/ "./node_modules/kabanery-spa/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/kabanery-spa/src/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  removeChilds
} = __webpack_require__(/*! doming */ "./node_modules/doming/index.js");

const {
  mount
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");

const {
  parse
} = __webpack_require__(/*! url */ "./node_modules/url/url.js");

const SINGLE_JUMP_PREFIX = 'single://';

const CONTAINER_ID = 'pager';

const queryPager = (map = [], index) => {
  index = initDefaultPage(map, index);

  return (url) => {
    const urlObject = parse(url, true);
    const pageName = urlObject.query['page'] || index;

    return map[pageName];
  };
};

const restPager = (map = [], index) => {
  index = initDefaultPage(map, index);

  return (url) => {
    const pathname = url.split(/.*:\/\//)[1];
    const pageName = pathname.split('/')[1] || index;

    return map[pageName];
  };
};

const initDefaultPage = (map = [], index) => {
  if (index === null || index === undefined) {
    for (const name in map) {
      index = name;
      break;
    }
  }
  return index;
};

const renderPage = (render, pageEnv, title, containerId) => {
  return Promise.resolve(render(pageEnv, title)).then((pageNode) => {
    // TODO pager is the default container, make it configurable
    const pager = document.getElementById(containerId);
    // unload old page
    removeChilds(pager);
    // add new page
    mount(pageNode, pager);
    pager.style = 'display:block;';
    document.title = title;

    // hash location
    if (window.location.hash) {
      const item = document.getElementById(window.location.hash.substring(1));
      if (item) {
        window.scrollTo(0, item.offsetTop);
      }
    }
  });
};

/**
 * pager: (url) => {title, render}
 */
const router = (pager, pageEnv, {
  onSwitchPageStart,
  onSwitchPageFinished,
  containerId = CONTAINER_ID
} = {}) => {
  let listenFlag = false;

  /**
   * only entrance for switching pages
   */
  const switchPage = (render, pageEnv, title) => {
    onSwitchPageStart && onSwitchPageStart(render, pageEnv, title);
    let ret = switchBetweenPages(render, pageEnv, title);

    Promise.resolve(ret).then((data) => {
      onSwitchPageFinished && onSwitchPageFinished(null, data);
    }).catch((err) => {
      onSwitchPageFinished && onSwitchPageFinished(err);
    });

    return ret;
  };

  const switchBetweenPages = (render, pageEnv, title) => {
    let ret = renderPage(render, pageEnv, title, containerId);

    if (!listenFlag) {
      listenPageSwitch();
      listenFlag = true;
    }

    return ret;
  };

  const forward = (url, {
    keepLocation
  } = {}) => {
    if (!window.history.pushState) {
      window.location.href = url;
      return;
    }
    let {
      render,
      title = '',
      transitionData = {}
    } = pager(url);

    if (url !== window.location.href) {
      window.history.pushState(transitionData, title, url);
    }
    if (!keepLocation) {
      window.scrollTo(0, 0);
    }
    return switchPage(render, pageEnv, title);
  };

  const redirect = (url) => {
    if (!window.history.pushState) {
      window.location.href = url;
      window.location.replace(url);
      return;
    }
    const {
      render,
      title = '',
      transitionData = {}
    } = pager(url);

    if (url !== window.location.href) {
      window.history.replaceState(transitionData, title, url);
    }
    return switchPage(render, pageEnv);
  };

  const listenPageSwitch = () => {
    window.onpopstate = () => {
      forward(window.location.href);
    };

    document.addEventListener('click', (e) => {
      // hack kabanery, TODO fix this hack
      setTimeout(() => {
        let target = e.target;
        // hack kabanery, TODO fix this hack
        if (e.__stopPropagation) return;

        while (target) {
          if (target.getAttribute) { // document does not have getAttribute method
            let url = (target.getAttribute('href') || '').trim();
            // matched
            if (url.indexOf(SINGLE_JUMP_PREFIX) === 0) {
              e.preventDefault();
              e.stopPropagation();

              forward(url.substring(SINGLE_JUMP_PREFIX.length).trim());
              break;
            }
          }
          target = target.parentNode;
        }
      });
    });
  };

  return {
    forward,
    redirect,
    reload: () => {
      return forward(window.location.href, {
        keepLocation: true
      });
    }
  };
};

module.exports = {
  router,
  queryPager,
  restPager
};


/***/ }),

/***/ "./node_modules/kabanery/index.js":
/*!****************************************!*\
  !*** ./node_modules/kabanery/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./src */ "./node_modules/kabanery/src/index.js");

/**
 * @readme-doc
 *
 * ## features
 *
 * - simple DOM DSL, construct dom tree quickly
 *
 * - data-driven view, include updating view by data
 *
 * - Just functions, easy to compose
 *
 * [readme-lang:zh]## 特征
 *
 * - 简单的DOM DSL，快速构建DOM结构
 *
 * - 数据驱动视图，包括通过数据更新视图
 *
 * - 以函数为核心，易于复合
 *
 */

/**
 * @readme-quick-run
 *
 * Using method n to construct dom node quickly.
 *
 * [readme-lang:zh]用方法n快速构造dom节点
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {n, mount} = kabanery;
 *
 * mount(n('div', {
 *   id: 'qu',
 *   style: {
 *      backgroundColor: 'red'
 *   }
 * }, [
 *      n('span class=go style="font-size:16px"', 'hello!')
 * ]), document.body);
 *
 * console.log(document.getElementById('qu').outerHTML); // print result
 */

/**
 * @readme-quick-run
 *
 * Basic way to construct a view.
 *
 * [readme-lang:zh]构造一个组件的简单方法
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {view, n, mount} = kabanery;
 *
 * let MyView = view((data) => {
 *      let {type} = data;
 *
 *      return n('div', {
 *         id: 'test1',
 *         style: {
 *            fontSize: 10
 *         }
 *      },[
 *          type === 2 && n('span', 'second'),
 *          type === 3 && n('div', 'third')
 *      ]);
 * });
 *
 * mount(MyView({type: 3}), document.body);
 *
 * console.log(document.getElementById('test1').outerHTML); // print result
 */

/**
 * @readme-quick-run
 *
 * Using update api to update a view.
 *
 * [readme-lang:zh]运用update api去更新一个view
 *
 * ## test tar=js r_c=kabanery env=browser
 * let {view, n, mount} = kabanery;
 *
 * let MyView = view((data, {update}) => {
 *      return n('div', {
 *         id: 'a',
 *         style: {
 *            fontSize: 10
 *         },
 *         onclick: () => {
 *            update('show', !data.show);
 *         }
 *      }, [
 *          data.show && n('div', 'show text')
 *      ]);
 * });
 *
 * mount(MyView({show: false}), document.body);
 *
 * document.getElementById('a').click(); // simulate user action
 * console.log(document.getElementById('a').outerHTML); // print result
 */


/***/ }),

/***/ "./node_modules/kabanery/node_modules/bolzano/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/kabanery/node_modules/bolzano/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject, funType, or, isString, isFalsy, likeArray
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let iterate = __webpack_require__(/*! ./lib/iterate */ "./node_modules/kabanery/node_modules/bolzano/lib/iterate.js");

let {
    map, reduce, find, findIndex, forEach, filter, any, exist, compact
} = __webpack_require__(/*! ./lib/fp */ "./node_modules/kabanery/node_modules/bolzano/lib/fp.js");

let contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;

let difference = (list1, list2, fopts) => {
    return reduce(list1, (prev, item) => {
        if (!contain(list2, item, fopts) &&
            !contain(prev, item, fopts)) {
            prev.push(item);
        }
        return prev;
    }, []);
};

let union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));

let mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));

let setValueKey = (obj, value, key) => {
    obj[key] = value;
    return obj;
};

let interset = (list1, list2, fopts) => {
    return reduce(list1, (prev, cur) => {
        if (contain(list2, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, []);
};

let deRepeat = (list, fopts, init = []) => {
    return reduce(list, (prev, cur) => {
        if (!contain(prev, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, init);
};

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let flat = (list) => {
    if (likeArray(list) && !isString(list)) {
        return reduce(list, (prev, item) => {
            prev = prev.concat(flat(item));
            return prev;
        }, []);
    } else {
        return [list];
    }
};

module.exports = {
    flat,
    contain,
    difference,
    union,
    interset,
    map,
    reduce,
    iterate,
    find,
    findIndex,
    deRepeat,
    forEach,
    filter,
    any,
    exist,
    get,
    delay,
    mergeMap,
    compact
};


/***/ }),

/***/ "./node_modules/kabanery/node_modules/bolzano/lib/fp.js":
/*!**************************************************************!*\
  !*** ./node_modules/kabanery/node_modules/bolzano/lib/fp.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let iterate = __webpack_require__(/*! ./iterate */ "./node_modules/kabanery/node_modules/bolzano/lib/iterate.js");

let defauls = {
    eq: (v1, v2) => v1 === v2
};

let setDefault = (opts, defauls) => {
    for (let name in defauls) {
        opts[name] = opts[name] || defauls[name];
    }
};

let forEach = (list, handler) => iterate(list, {
    limit: (rets) => {
        if (rets === true) return true;
        return false;
    },
    transfer: handler,
    output: (prev, cur) => cur,
    def: false
});

let map = (list, handler, limit) => iterate(list, {
    transfer: handler,
    def: [],
    limit
});

let reduce = (list, handler, def, limit) => iterate(list, {
    output: handler,
    def,
    limit
});

let filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {
    handler && handler(cur, index, list) && prev.push(cur);
    return prev;
}, [], limit);

let find = (list, item, fopts) => {
    let index = findIndex(list, item, fopts);
    if (index === -1) return undefined;
    return list[index];
};

let any = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev && originLogic(curLogic);
}, true, falsyIt);

let exist = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev || originLogic(curLogic);
}, false, originLogic);

let findIndex = (list, item, fopts = {}) => {
    setDefault(fopts, defauls);

    let {
        eq
    } = fopts;
    let predicate = (v) => eq(item, v);
    let ret = iterate(list, {
        transfer: indexTransfer,
        limit: onlyOne,
        predicate,
        def: []
    });
    if (!ret.length) return -1;
    return ret[0];
};

let compact = (list) => reduce(list, (prev, cur) => {
    if (cur) prev.push(cur);
    return prev;
}, []);

let indexTransfer = (item, index) => index;

let onlyOne = (rets, item, name, domain, count) => count >= 1;

let falsyIt = v => !v;

let originLogic = v => !!v;

module.exports = {
    map,
    forEach,
    reduce,
    find,
    findIndex,
    filter,
    any,
    exist,
    compact
};


/***/ }),

/***/ "./node_modules/kabanery/node_modules/bolzano/lib/iterate.js":
/*!*******************************************************************!*\
  !*** ./node_modules/kabanery/node_modules/bolzano/lib/iterate.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, mapType
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

/**
 *
 * preidcate: chose items to iterate
 * limit: when to stop iteration
 * transfer: transfer item
 * output
 */
let iterate = funType((domain = [], opts = {}) => {
    let {
        predicate, transfer, output, limit, def
    } = opts;

    opts.predicate = predicate || truthy;
    opts.transfer = transfer || id;
    opts.output = output || toList;
    if (limit === undefined) limit = domain && domain.length;
    limit = opts.limit = stopCondition(limit);

    let rets = def;
    let count = 0;

    if (likeArray(domain)) {
        for (let i = 0; i < domain.length; i++) {
            let itemRet = iterateItem(domain, i, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    } else if (isObject(domain)) {
        for (let name in domain) {
            let itemRet = iterateItem(domain, name, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    }

    return rets;
}, [
    or(isObject, isFunction, isFalsy),
    or(isUndefined, mapType({
        predicate: or(isFunction, isFalsy),
        transfer: or(isFunction, isFalsy),
        output: or(isFunction, isFalsy),
        limit: or(isUndefined, isNumber, isFunction)
    }))
]);

let iterateItem = (domain, name, count, rets, {
    predicate, transfer, output, limit
}) => {
    let item = domain[name];
    if (limit(rets, item, name, domain, count)) {
        // stop
        return {
            stop: true,
            count,
            rets
        };
    }

    if (predicate(item)) {
        rets = output(rets, transfer(item, name, domain, rets), name, domain);
        count++;
    }
    return {
        stop: false,
        count,
        rets
    };
};

let stopCondition = (limit) => {
    if (isUndefined(limit)) {
        return falsy;
    } else if (isNumber(limit)) {
        return (rets, item, name, domain, count) => count >= limit;
    } else {
        return limit;
    }
};

let toList = (prev, v) => {
    prev.push(v);
    return prev;
};

let truthy = () => true;

let falsy = () => false;

let id = v => v;

module.exports = iterate;


/***/ }),

/***/ "./node_modules/kabanery/src/const/index.js":
/*!**************************************************!*\
  !*** ./node_modules/kabanery/src/const/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");

const seed = uuidv4();

module.exports = {
  eventMapHook: `__eventMap_${seed}`,
  globalEventTypePrefix: `__event_type_id_${seed}_`,
  stopPropagationFlag: '__stopPropagation'
};


/***/ }),

/***/ "./node_modules/kabanery/src/event/eventMatrix.js":
/*!********************************************************!*\
  !*** ./node_modules/kabanery/src/event/eventMatrix.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
  contain
} = __webpack_require__(/*! bolzano */ "./node_modules/kabanery/node_modules/bolzano/index.js");

let {
  eventMapHook,
  globalEventTypePrefix,
  stopPropagationFlag
} = __webpack_require__(/*! ../const */ "./node_modules/kabanery/src/const/index.js");

module.exports = () => {
  let docs = [];
  let eventTypeMap = {};
  let handlerMap = {};

  let listenEventType = (type) => {
    if (!eventTypeMap[type]) {
      updateDocs(type);
    }
    eventTypeMap[type] = true;
  };

    /**
     * attach document used to accept events
     */
  let attachDocument = (doc = document) => {
    if (!contain(docs, doc)) {
      for (let type in eventTypeMap) {
        // prevent multiple version of kabanery to binding multiple times for the same type
        let id = getGlobalEventTypeId(type);
        if (!doc[id]) {
          addEventListenerToDoc(doc, type);
          doc[id] = true;
        }
      }
      docs.push(doc);
    }
  };

  let updateDocs = (type) => {
    if (!docs.length) {
      docs.push(document);
    }
    for (let i = 0; i < docs.length; i++) {
      let doc = docs[i];
      addEventListenerToDoc(doc, type);
    }
  };

  let addEventListenerToDoc = (doc, type) => {
    let handler = null;
    if (handlerMap[type]) {
      handler = handlerMap[type];
    } else {
      handler = listener(type);
      handlerMap[type] = handler;
    }
    doc.addEventListener(type, handler);
  };

  let clearEvents = () => {
    for (let type in eventTypeMap) {
      removeListenerType(type);
    }
  };

  let removeListenerType = (type) => {
    let handler = handlerMap[type];
    if (handler) {
      for (let i = 0; i < docs.length; i++) {
        let doc = docs[i];
        doc.removeEventListener(type, handler);
      }
      delete handlerMap[type];
      delete eventTypeMap[type];
    }
  };

  let getDocs = () => docs.slice(0);

  /**
     * e = {
     *  target,
     *  stopPropagation [optional]
     * }
     */
  let listener = (type) => function(e) {
    let ctx = this;
    let target = e.target;

    // hack the stopPropagration function
    let oldProp = e.stopPropagation;
    e.stopPropagation = function(...args) {
      e[stopPropagationFlag] = true;
      return oldProp && oldProp.apply(this, args);
    };

    let nodePath = getNodePath(target);

    for (let i = 0; i < nodePath.length; i++) {
      let node = nodePath[i];
      applyNodeHandlers(e, type, node, ctx);
    }
  };

  let applyNodeHandlers = (e, type, node, ctx) => {
    if (e.__stopPropagation) { // event already been stoped by child node
      return true;
    }

    let handler = getHandler(type, node);
    return handler && handler.apply(ctx, [e]);
  };

  let getHandler = (type, target) => {
    let eventMap = target && target[eventMapHook];
    return eventMap && eventMap[type];
  };

  let dispatchEvent = (type, e) => {
    let handler = handlerMap[type];
    handler && handler(e);
  };

  return {
    listenEventType,
    clearEvents,
    removeListenerType,
    getDocs,
    attachDocument,
    dispatchEvent
  };
};

/**
 * get the path of node
 */
let getNodePath = (target) => {
  let paths = [];
  while (target) {
    paths.push(target);
    target = target.parentNode;
  }
  return paths;
};

let getGlobalEventTypeId = (type) => `${globalEventTypePrefix}${type}`;


/***/ }),

/***/ "./node_modules/kabanery/src/event/index.js":
/*!**************************************************!*\
  !*** ./node_modules/kabanery/src/event/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let EventMatrix = __webpack_require__(/*! ./eventMatrix */ "./node_modules/kabanery/src/event/eventMatrix.js");

let {
  eventMapHook
} = __webpack_require__(/*! ../const */ "./node_modules/kabanery/src/const/index.js");

let {
  listenEventType,
  clearEvents,
  attachDocument,
  dispatchEvent
} = EventMatrix();

let bindEvents = (node, eventMap) => {
  // hook event at node
  node[eventMapHook] = eventMap;

  for (let type in eventMap) {
    listenEventType(type);
  }
};

module.exports = {
  bindEvents,
  attachDocument,
  dispatchEvent,
  clearEvents
};


/***/ }),

/***/ "./node_modules/kabanery/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/kabanery/src/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  n,
  svgn,
  parseArgs,
  isKabaneryNode,
  parseStyle
} = __webpack_require__(/*! ./n */ "./node_modules/kabanery/src/n/index.js");

const {
  view
} = __webpack_require__(/*! ./view */ "./node_modules/kabanery/src/view/index.js");

const {
  dispatchEvent,
  clearEvents
} = __webpack_require__(/*! ./event */ "./node_modules/kabanery/src/event/index.js");

const {
  toHTML,
  mount
} = __webpack_require__(/*! ./resolver */ "./node_modules/kabanery/src/resolver/index.js");

module.exports = {
  n,
  isKabaneryNode,
  svgn,
  view,
  mount,
  toHTML,

  parseArgs,
  parseStyle,
  dispatchEvent,
  clearEvents
};


/***/ }),

/***/ "./node_modules/kabanery/src/n/index.js":
/*!**********************************************!*\
  !*** ./node_modules/kabanery/src/n/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  isObject,
  isNode,
  isFunction
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");

const parseArgs = __webpack_require__(/*! ./parseArgs */ "./node_modules/kabanery/src/n/parseArgs.js");

const parseStyle = __webpack_require__(/*! ./parseStyle */ "./node_modules/kabanery/src/n/parseStyle.js");

const KABANERY_NODE = 'kabanery_node';

const KABANERY_RENDER_NODE = 'kabanery_high_node';

const isKabaneryNode = (v) => isObject(v) && v.type === KABANERY_NODE;

const isKabaneryRenderNode = (v) => isObject(v) && v.type === KABANERY_RENDER_NODE;

const knodeCreator = (elementType) => {
  return (...args) => {
    if (isFunction(args[0])) { // render function
      return createRenderNode(elementType, args);
    } else {
      return createKabaneryNode(elementType, args);
    }
  };
};

/**
 * render: (...args) => kabaneryNode
 */
const createRenderNode = (elementType, args) => {
  return {
    render: args[0],
    args: args.slice(1),
    elementType,
    type: KABANERY_RENDER_NODE,
  };
};

const createKabaneryNode = (elementType, args) => {
  let {
    tagName,
    attributes,
    childs
  } = parseArgs(args);

  if (isKabaneryNode(attributes) ||
    isNode(attributes)) {
    childs = [attributes];
    attributes = {};
  }

  const {
    attrMap,
    eventMap
  } = splitAttribues(attributes);

  return {
    tagName,
    attrMap,
    eventMap,
    elementType,
    type: KABANERY_NODE,
    childNodes: childs,
  };
};

/**
 * split event handlers
 */
let splitAttribues = (attributes) => {
  const attrMap = {},
    eventMap = {};
  for (const name in attributes) {
    const item = attributes[name];
    if (name.indexOf('on') === 0) {
      eventMap[name.substring(2)] = item;
    } else {
      attrMap[name] = item;
    }
  }
  return {
    attrMap,
    eventMap
  };
};

module.exports = {
  n: knodeCreator('html'),
  svgn: knodeCreator('svg'),
  knodeCreator,
  isKabaneryNode,
  isKabaneryRenderNode,
  parseArgs,
  parseStyle
};


/***/ }),

/***/ "./node_modules/kabanery/src/n/parseArgs.js":
/*!**************************************************!*\
  !*** ./node_modules/kabanery/src/n/parseArgs.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const parseAttribute = __webpack_require__(/*! ./parseAttribute */ "./node_modules/kabanery/src/n/parseAttribute.js");

const {
  isString,
  isObject,
  isNode,
  likeArray,
  isNumber,
  isBool
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");

const parseArgs = (args, {
  doParseStyle = true
} = {}) => {
  let tagName,
    attributes = {},
    childExp = [];

  let first = args.shift();

  let parts = splitTagNameAttribute(first);

  if (parts.length > 1) { // not only tagName
    tagName = parts[0];
    attributes = parts[1];
  } else {
    tagName = first;
  }

  let next = args.shift();

  let nextAttr = {};

  if (likeArray(next) ||
        isString(next) ||
        isNode(next) ||
        isNumber(next) ||
        isBool(next)) {
    childExp = next;
  } else if (isObject(next)) {
    nextAttr = next;
    childExp = args.shift() || [];
  }

  attributes = parseAttribute(attributes, nextAttr, {
    doParseStyle
  });

  let childs = parseChildExp(childExp);

  return {
    tagName,
    attributes,
    childs
  };
};

let splitTagNameAttribute = (str = '') => {
  if (typeof str !== 'string') return [str];

  let tagName = str.split(' ')[0];
  let attr = str.substring(tagName.length);
  attr = attr && attr.trim();

  tagName = tagName.toLowerCase().trim();
  if (attr) {
    return [tagName, attr];
  } else {
    return [tagName];
  }
};

const parseChildExp = (childExp) => {
  let ret = [];
  if (isNode(childExp)) {
    ret.push(childExp);
  } else if (likeArray(childExp)) {
    for (let i = 0; i < childExp.length; i++) {
      let child = childExp[i];
      ret = ret.concat(parseChildExp(child));
    }
  } else if (childExp) {
    ret.push(childExp);
  }
  return ret;
};

module.exports = parseArgs;


/***/ }),

/***/ "./node_modules/kabanery/src/n/parseAttribute.js":
/*!*******************************************************!*\
  !*** ./node_modules/kabanery/src/n/parseAttribute.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
  isString
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let parseStyle = __webpack_require__(/*! ./parseStyle */ "./node_modules/kabanery/src/n/parseStyle.js");

let {
  mergeMap
} = __webpack_require__(/*! bolzano */ "./node_modules/kabanery/node_modules/bolzano/index.js");

const ITEM_REG = /([\w-]+)\s*=\s*(([\w-]+)|('.*?')|(".*?"))/;

// TODO better key=value grammer
// TODO refactor with grammerL: class grammer, id grammer, refer some popular grammer
let parseAttribute = (attributes, nextAttr, {
  doParseStyle
}) => {
  // key=value key=value
  // value='abc' value=true value=123 value="def"
  if (isString(attributes)) {
    let str = attributes.trim(),
      kvs = [];

    let stop = false;
    while (!stop) {
      let newstr = str.replace(ITEM_REG, (matchStr, $1, $2) => {
        kvs.push([$1, $2]);
        return '';
      }).trim();
      if (newstr === str) {
        stop = true;
      }
      str = newstr;
    }

    attributes = {};
    for (let i = 0; i < kvs.length; i++) {
      let [key, value] = kvs[i];
      if (value[0] === '\'' && value[value.length - 1] === '\'' ||
                value[0] === '"' && value[value.length - 1] === '"') {
        value = value.substring(1, value.length - 1);
      }
      attributes[key] = value;
    }
  }
  // merge
  attributes = mergeMap(attributes, nextAttr);

  if (attributes.style && doParseStyle) {
    attributes.style = parseStyle(attributes.style);
  }

  // TODO presudo
  /*
    if (attributes.presudo) {
        for (let name in attributes.presudo) {
            attributes.presudo[name] = parseStyle(attributes.presudo[name]);
        }
    }
   */

  return attributes;
};

module.exports = parseAttribute;


/***/ }),

/***/ "./node_modules/kabanery/src/n/parseStyle.js":
/*!***************************************************!*\
  !*** ./node_modules/kabanery/src/n/parseStyle.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  isString,
  isObject
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");

module.exports = (attr = '', {
  keyWrapper,
  valueWrapper
} = {}) => {
  if (isString(attr)) {
    return attr;
  }

  if (!isObject(attr)) {
    throw new TypeError(`Expect object for style object, but got ${attr}`);
  }

  const styles = [];

  for (let key in attr) {
    let value = attr[key];
    key = convertStyleKey(key);
    value = convertStyleValue(value, key);
    if (keyWrapper) {
      key = keyWrapper(key, value);
    }

    if (valueWrapper) {
      value = valueWrapper(value, key);
    }

    styles.push(`${key}: ${value};`);
  }

  return styles.join('');
};

const convertStyleKey = (key) => {
  return key.replace(/[A-Z]/, (letter) => {
    return `-${letter.toLowerCase()}`;
  });
};

const convertStyleValue = (value, key) => {
  if (typeof value === 'number' && key !== 'z-index') {
    return value + 'px';
  }
  if (key === 'padding' || key === 'margin') {
    let parts = value.split(' ');
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (!isNaN(Number(part))) {
        parts[i] = part + 'px';
      }
    }

    value = parts.join(' ');
  }
  return value;
};


/***/ }),

/***/ "./node_modules/kabanery/src/resolver/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/kabanery/src/resolver/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const toDomNode = __webpack_require__(/*! ./toDomNode */ "./node_modules/kabanery/src/resolver/toDomNode.js");
const {
  isNode
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");
const {
  isKabaneryNode,
  isKabaneryRenderNode
} = __webpack_require__(/*! ../n */ "./node_modules/kabanery/src/n/index.js");
const resolveKRenderNode = __webpack_require__(/*! ./resolveKRenderNode */ "./node_modules/kabanery/src/resolver/resolveKRenderNode.js");

const toHTML = (node) => {
  if (isNode(node)) {
    return node.outerHTML;
  } else if (isKabaneryNode(node)) {
    const {
      tagName,
      attrMap,
      childNodes
    } = node;

    let attrs = [];
    for (const key in attrMap) {
      const value = attrMap[key];
      attrs.push(`${key}="${value}"`);
    }

    let attrStr = attrs.join(' ');
    attrStr = attrStr ? ' ' + attrStr : '';

    let childs = [];
    for (let i = 0, n = childNodes.length; i < n; i++) {
      childs.push(toHTML(childNodes[i]));
    }

    return `<${tagName}${attrStr}>${childs.join('')}</${tagName}>`;
  } else if (isKabaneryRenderNode(node)) {
    return toHTML(resolveKRenderNode(node));
  } else {
    return node + '';
  }
};

const mount = __webpack_require__(/*! ./mount */ "./node_modules/kabanery/src/resolver/mount.js");

module.exports = {
  toDomNode,
  toHTML,
  mount,
  resolveKRenderNode
};


/***/ }),

/***/ "./node_modules/kabanery/src/resolver/mount.js":
/*!*****************************************************!*\
  !*** ./node_modules/kabanery/src/resolver/mount.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  attachDocument
} = __webpack_require__(/*! ../event */ "./node_modules/kabanery/src/event/index.js");

const {
  isNode
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");

const {
  flat,
  forEach
} = __webpack_require__(/*! bolzano */ "./node_modules/kabanery/node_modules/bolzano/index.js");

const toDomNode = __webpack_require__(/*! ./toDomNode */ "./node_modules/kabanery/src/resolver/toDomNode.js");

/**
 * @param parentNode
 *      the dom node used hook node we rendered
 */
module.exports = (kabaneryRoots, parentNode) => {
  kabaneryRoots = flat(kabaneryRoots);

  forEach(kabaneryRoots, (item) => {
    item = toDomNode(item);
    if (isNode(item)) {
      parentNode.appendChild(item);
    }
  });

  // attach to document
  attachDocument(getDoc(parentNode));
};

const getDoc = (node) => {
  while (node.parentNode) {
    node = node.parentNode;
  }
  return node;
};


/***/ }),

/***/ "./node_modules/kabanery/src/resolver/resolveKRenderNode.js":
/*!******************************************************************!*\
  !*** ./node_modules/kabanery/src/resolver/resolveKRenderNode.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = (node) => {
  const {
    render,
    args
  } = node;
  return render(...args);
};


/***/ }),

/***/ "./node_modules/kabanery/src/resolver/toDomNode.js":
/*!*********************************************************!*\
  !*** ./node_modules/kabanery/src/resolver/toDomNode.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  isNode,
  createElement,
  createSvgElement
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");
const {
  bindEvents
} = __webpack_require__(/*! ../event */ "./node_modules/kabanery/src/event/index.js");
const {
  map
} = __webpack_require__(/*! bolzano */ "./node_modules/kabanery/node_modules/bolzano/index.js");
const {
  isKabaneryNode,
  isKabaneryRenderNode
} = __webpack_require__(/*! ../n */ "./node_modules/kabanery/src/n/index.js");
const resolveKRenderNode = __webpack_require__(/*! ./resolveKRenderNode */ "./node_modules/kabanery/src/resolver/resolveKRenderNode.js");

const toDomNode = (node) => {
  if (isKabaneryNode(node)) {
    let tarNode = null;
    if (node.elementType === 'html') {
      tarNode = createElement(node.tagName, node.attrMap, map(node.childNodes, toDomNode));
    } else { // svg
      tarNode = createSvgElement(node.tagName, node.attrMap, map(node.childNodes, toDomNode));
    }

    bindEvents(tarNode, node.eventMap);
    return tarNode;
  } else if (isKabaneryRenderNode(node)) {
    return toDomNode(resolveKRenderNode(node));
  } else if (isNode(node)) {
    return node;
  } else {
    return document.createTextNode(node.toString());
  }
};

module.exports = toDomNode;


/***/ }),

/***/ "./node_modules/kabanery/src/util/index.js":
/*!*************************************************!*\
  !*** ./node_modules/kabanery/src/util/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toArray = (v) => Array.prototype.slice.call(v);

const isNode = (o) => {
  return (
    typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
  );
};

const bind = (fn, ctx) => {
  return (...args) => {
    return fn.apply(ctx, args);
  };
};

const isObject = (v) => v && typeof v === 'object';

const isString = (v) => typeof v === 'string';

const isNumber = (v) => typeof v === 'number';

const likeArray = (v) => isObject(v) && isNumber(v.length) && v.length >= 0;

const isBool = (v) => typeof v === 'boolean';

const isFunction = (v) => typeof v === 'function';

const set = (sandbox, name = '', value) => {
  name = name.trim();
  let parts = !name ? [] : name.split('.');
  let parent = sandbox;
  if (!isObject(parent)) return;
  if (!parts.length) return;
  for (let i = 0; i < parts.length - 1; i++) {
    let part = parts[i];
    let next = parent[part];
    if (!isObject(next)) {
      next = {};
      parent[part] = next;
    }
    parent = next;
  }

  parent[parts[parts.length - 1]] = value;
  return sandbox;
};

const svgNS = 'http://www.w3.org/2000/svg';

const applyNode = (node, attributes, childs) => {
  for (let name in attributes) {
    const attr = attributes[name];
    node.setAttribute(name, attr);
  }

  for (let i = 0; i < childs.length; i++) {
    const child = childs[i];
    if (isNode(child)) {
      node.appendChild(child);
    } else {
      node.textContent = child + '';
    }
  }
};

const createElement = (tagName, attributes, childs) => {
  const node = document.createElement(tagName);
  applyNode(node, attributes, childs);
  return node;
};

const createSvgElement = (tagName, attributes, childs) => {
  const node = document.createElementNS(svgNS, tagName);
  applyNode(node, attributes, childs);
  return node;
};

const getAttributeMap = (attributes = []) => {
  const map = {};
  for (let i = 0; i < attributes.length; i++) {
    const {
      name,
      value
    } = attributes[i];
    map[name] = value;
  }
  return map;
};

const removeNode = (oldNode) => {
  let parent = oldNode.parentNode;
  if (parent) {
    parent.removeChild(oldNode);
  }
};

const hasOwnProperty = (obj, key) => {
  if (obj.hasOwnProperty) {
    return obj.hasOwnProperty(key);
  }
  for (const name in obj) {
    if (name === key) return true;
  }
  return false;
};

const emptyChildren = (node) => {
  const childNodes = node.childNodes;
  for (let i = 0, n = childNodes.length; i < n; i++) {
    node.removeChild(childNodes[i]);
  }
};

module.exports = {
  toArray,
  isNode,
  isObject,
  likeArray,
  bind,
  isString,
  isNumber,
  isBool,
  isFunction,
  set,
  createElement,
  createSvgElement,
  getAttributeMap,
  removeNode,
  hasOwnProperty,
  emptyChildren
};


/***/ }),

/***/ "./node_modules/kabanery/src/view/index.js":
/*!*************************************************!*\
  !*** ./node_modules/kabanery/src/view/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  isFunction
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");
const updateData = __webpack_require__(/*! ./updateData */ "./node_modules/kabanery/src/view/updateData.js");
const replace = __webpack_require__(/*! ./replace */ "./node_modules/kabanery/src/view/replace/index.js");
const isViewNode = __webpack_require__(/*! ./isViewNode */ "./node_modules/kabanery/src/view/isViewNode.js");
const {
  n
} = __webpack_require__(/*! ../n */ "./node_modules/kabanery/src/n/index.js");
const {
  mount
} = __webpack_require__(/*! ../resolver */ "./node_modules/kabanery/src/resolver/index.js");

const ViewContext = function(view, obj) {
  this.node = null;
  this.data = obj;
  this.render = view;
  this.kNode = null;
};

ViewContext.prototype = {
  construct: ViewContext,

  update: function(...args) {
    updateData(this.data, args);
    return this.renderView();
  },

  appendView: function(itemView) {
    if (this.node) {
      mount(itemView, this.node);
    }
  },

  renderView: function() {
    const newKNode = this.getKabaneryNode();
    this.node = replace(this.node, newKNode, this.kNode);
    this.kNode = newKNode;
    if (this.node) {
      this.node.ctx = this.getContext();
    }
    return this.node;
  },

  getKabaneryNode: function() {
    let ret = this.render(this.data, this.getContext());

    if (isFunction(ret)) {
      this.render = ret;
      return this.render(this.data, this.getContext());
    } else {
      return ret;
    }
  },

  getKNode: function() {
    return this.kNode;
  },

  getNode: function() {
    return this.node;
  },

  getData: function() {
    return this.data;
  },

  // TODO refator
  transferCtx: function(newNode) {
    newNode.ctx = this.getContext();
    this.node = newNode;
  },

  getContext: function() {
    return this._ctx;
  }
};

var getViewContext = (view, obj) => {
  const _ctx = {};

  const ctxInst = new ViewContext(view, obj);

  ctxInst._ctx = _ctx;

  for (const name in ViewContext.prototype) {
    if (name !== 'construct') {
      _ctx[name] = (...args) => ctxInst[name].apply(ctxInst, args);
    }
  }

  return _ctx;
};

module.exports = {
  view: (viewFun) => {
    return (obj) => {
      // create context
      const ctx = getViewContext(viewFun, obj);
      // render node
      const viewNode = n(() => ctx.renderView());
      // export context
      viewNode.ctx = ctx;
      viewNode.__isViewNode = true;

      return viewNode;
    };
  },

  // TODO exports interface to expand context prototype
  isViewNode
};


/***/ }),

/***/ "./node_modules/kabanery/src/view/isViewNode.js":
/*!******************************************************!*\
  !*** ./node_modules/kabanery/src/view/isViewNode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  isObject
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");

module.exports = (v) => isObject(v) && v.__isViewNode;


/***/ }),

/***/ "./node_modules/kabanery/src/view/replace/diffNode.js":
/*!************************************************************!*\
  !*** ./node_modules/kabanery/src/view/replace/diffNode.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  isNode,
  removeNode
} = __webpack_require__(/*! ../../util */ "./node_modules/kabanery/src/util/index.js");
const isViewNode = __webpack_require__(/*! ../isViewNode */ "./node_modules/kabanery/src/view/isViewNode.js");
const {
  getTagName,
  getTextAreaTextContent,
  getAttributeValue
} = __webpack_require__(/*! ./util */ "./node_modules/kabanery/src/view/replace/util.js");
const {
  toDomNode
} = __webpack_require__(/*! ../../resolver */ "./node_modules/kabanery/src/resolver/index.js");
const {
  eventMapHook
} = __webpack_require__(/*! ../../const */ "./node_modules/kabanery/src/const/index.js");
const editAttributes = __webpack_require__(/*! ./editAttributes */ "./node_modules/kabanery/src/view/replace/editAttributes.js");
const {
  isKabaneryNode
} = __webpack_require__(/*! ../../n */ "./node_modules/kabanery/src/n/index.js");

/**
 * replace old node with new node
 */
const replaceDirectly = (node, newKNode) => {
  const parent = node.parentNode;
  const newNode = toDomNode(newKNode);
  if (!parent) {
    return newNode;
  }

  // replace
  parent.replaceChild(newNode, node);
  return newNode;
};

// node and newKNode have the same tagName
const editNode = (node, newKNode, oldKNode) => {
  // attributes
  editAttributes(node, newKNode, oldKNode);

  // hacks for dom
  if (getTagName(node) === 'TEXTAREA') {
    node.value = getTextAreaTextContent(newKNode);
  }
  if (getTagName(node) === 'INPUT') {
    node.value = getAttributeValue(newKNode, 'value');
  }

  // transfer event map
  node[eventMapHook] = newKNode.eventMap || {};

  // TODO using key
  diffList(newKNode.childNodes, oldKNode.childNodes, node);
};

const diffList = (newKChilds, oldKChilds, parent) => {
  const childNodes = parent.childNodes,
    oldLen = oldKChilds.length,
    newLen = newKChilds.length;

  // remove
  for (let i = newLen; i < oldLen; i++) {
    childNodes[i] && removeNode(childNodes[i]);
  }

  // diff
  for (let i = 0, n = Math.min(newLen, oldLen); i < n; i++) {
    diffNode(childNodes[i], newKChilds[i], oldKChilds[i]);
  }

  // append
  for (let i = oldLen; i < newLen; i++) {
    parent.appendChild(toDomNode(newKChilds[i]));
  }
};

const diffNode = (node, newKNode, oldKNode) => {
  if (!isNode(node)) return node;

  const newKabNode = isViewNode(newKNode) ? newKNode.ctx.getKabaneryNode() : newKNode;
  const oldKabNode = isViewNode(oldKNode) ? oldKNode.ctx.getKNode() : oldKNode;

  if (isKabaneryNode(newKabNode) && isKabaneryNode(oldKabNode)) {
    if (getTagName(oldKabNode) !== getTagName(newKabNode)) {
      return replaceDirectly(node, newKabNode);
    } else {
      editNode(node, newKabNode, oldKabNode);
      return node;
    }
  } else {
    return replaceDirectly(node, newKNode);
  }
};

module.exports = diffNode;


/***/ }),

/***/ "./node_modules/kabanery/src/view/replace/editAttributes.js":
/*!******************************************************************!*\
  !*** ./node_modules/kabanery/src/view/replace/editAttributes.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  hasOwnProperty
} = __webpack_require__(/*! ../../util */ "./node_modules/kabanery/src/util/index.js");

const {
  getAttrMap
} = __webpack_require__(/*! ./util */ "./node_modules/kabanery/src/view/replace/util.js");

module.exports = (node, newKNode, oldKNode) => {
  // attributes
  const orinAttrMap = getAttrMap(oldKNode);
  const newAttrMap = getAttrMap(newKNode);

  // update and remove
  for (const name in orinAttrMap) {
    const orinValue = orinAttrMap[name];
    if (hasOwnProperty(newAttrMap, name)) {
      let newValue = newAttrMap[name];
      if (newValue !== orinValue) {
        node.setAttribute(name, newValue);
      }
    } else {
      node.removeAttribute(name);
    }
  }

  for (const name in newAttrMap) {
    const newAttr = newAttrMap[name];
    if (!hasOwnProperty(orinAttrMap, name)) {
      node.setAttribute(name, newAttr);
    }
  }
};


/***/ }),

/***/ "./node_modules/kabanery/src/view/replace/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/kabanery/src/view/replace/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const diffNode = __webpack_require__(/*! ./diffNode */ "./node_modules/kabanery/src/view/replace/diffNode.js");
const {
  toDomNode
} = __webpack_require__(/*! ../../resolver */ "./node_modules/kabanery/src/resolver/index.js");
const {
  removeNode
} = __webpack_require__(/*! ../../util */ "./node_modules/kabanery/src/util/index.js");

// TODO type check for newNode
module.exports = (realNode, newKNode, oldKNode) => {
  if (!realNode) { // add new node
    return toDomNode(newKNode);
  } else if (!newKNode) { // delete old node
    removeNode(realNode);
    return null;
  } else { // diff with old node
    return diffNode(realNode, newKNode, oldKNode);
  }
};


/***/ }),

/***/ "./node_modules/kabanery/src/view/replace/util.js":
/*!********************************************************!*\
  !*** ./node_modules/kabanery/src/view/replace/util.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const {
  isNode,
  getAttributeMap
} = __webpack_require__(/*! ../../util */ "./node_modules/kabanery/src/util/index.js");

const getTagName = (node) => {
  return node.tagName.toUpperCase();
};

const getAttrMap = (node) => {
  if (isNode(node)) {
    return getAttributeMap(node.attributes);
  } else { // kabanery node
    return node.attrMap;
  }
};

const getTextAreaTextContent = (node) => {
  if (isNode(node)) {
    return node.textContent;
  } else {
    return (node.childNodes.length && node.childNodes[0]) || '';
  }
};

const getAttributeValue = (node, key) => {
  if (isNode(node)) {
    return node.getAttribute(key);
  } else {
    return node.attrMap[key];
  }
};

module.exports = {
  getTagName,
  getAttrMap,
  getTextAreaTextContent,
  getAttributeValue
};


/***/ }),

/***/ "./node_modules/kabanery/src/view/updateData.js":
/*!******************************************************!*\
  !*** ./node_modules/kabanery/src/view/updateData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  set,
  isFunction,
  likeArray
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");

const updateData = (data, scripts) => {
  if (scripts.length === 1 && likeArray(scripts[0])) {
    let arg = scripts[0];
    for (let i = 0, n = arg.length; i < n; i++) {
      const item = arg[i];
      set(data, item[0], item[1]);
    }
  } else {
    let [path, value] = scripts;

    // function is a special data
    if (isFunction(value)) {
      value = value(data);
    }

    set(data, path, value);
  }
};

module.exports = updateData;


/***/ }),

/***/ "./node_modules/lumine-signal/index.js":
/*!*********************************************!*\
  !*** ./node_modules/lumine-signal/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib */ "./node_modules/lumine-signal/lib/index.js");


/***/ }),

/***/ "./node_modules/lumine-signal/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/lumine-signal/lib/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * signal system protocol
 */

const {
    foldFuns,
    isString,
    isObject,
    isFunction
} = __webpack_require__(/*! ./util */ "./node_modules/lumine-signal/lib/util.js");

/**
 * signal:
 * {
 *   type,
 *   data,
 *   extra
 * }
 *
 * type := [0-9a-zA-Z\-\_]+
 *
 * TODO type grammer check
 */
const Signal = (type, data, extra) => {
    return {
        type,
        data,
        extra
    };
};

const isSignalType = (s, type) => {
    return s.type === type;
};

/**
 * handle specific type of signal.
 *
 * TODO a simple grammer to compose signal type
 */
const onSignalType = (expectType, fn) => {
    if (!isString(expectType)) {
        throw new TypeError(`Expect string, but got ${expectType}`);
    }
    if (!isFunction(fn)) {
        throw new TypeError(`Expect function, but got ${fn}`);
    }

    return (signal, ...rest) => {
        if (isSignalType(signal, expectType)) {
            return fn(signal, ...rest);
        }
    };
};

/**
 * pass signal directly
 *
 * TODO delivery chain
 */
const deliver = (ctx, type, extra) => (sourceSignal, sourceData, sourceCtx) => {
    return ctx.notify(Signal(type, sourceSignal.data, {
        sourceType: 'delivered',
        sourceSignal,
        sourceData,
        sourceCtx,
        extra
    }));
};

/**
 * pass signal
 */
const pass = (ctx, fromSignalType = '', toSignalType) => {
    let map = {};

    if (isString(fromSignalType)) {
        map[fromSignalType] = toSignalType;
    } else if (isObject(fromSignalType)) {
        map = fromSignalType;
    }

    let list = [];
    for (let from in map) {
        let next = map[from] ? map[from] : from;
        list.push(onSignalType(from, deliver(ctx, next)));
    }

    return foldFuns(list);
};

module.exports = {
    Signal,
    onSignalType,
    isSignalType,
    deliver,
    pass
};


/***/ }),

/***/ "./node_modules/lumine-signal/lib/util.js":
/*!************************************************!*\
  !*** ./node_modules/lumine-signal/lib/util.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const isObject = (v) => v && typeof v === 'object';

const isString = (v) => typeof v === 'string';

const foldFuns = (fns) => {
    // TODO check
    return (...args) => {
        let ret = [];
        for (let i = 0, n = fns.length; i < n; i++) {
            ret.push(fns[i](...args));
        }
        return ret;
    };
};

const isFunction = (v) => typeof v === 'function';

module.exports = {
    isObject,
    foldFuns,
    isString,
    isFunction
};


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/pfc-compiler/lib/stubAsApis.js":
/*!*****************************************************!*\
  !*** ./node_modules/pfc-compiler/lib/stubAsApis.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject,
    isFunction
} = __webpack_require__(/*! ../src/util */ "./node_modules/pfc-compiler/src/util.js");

/**
 * we got stub and use it as apis to ccontruct pfc code
 */

module.exports = (variableStub = {}) => {
    let apiMap = {};

    for (let name in variableStub) {
        let stub = variableStub[name];
        if (stub.type === 'function') {
            apiMap[name] = (...params) => callStubFunction(name, params, variableStub[name] || {});
        } else {
            apiMap[name] = callStubVariable(name);
        }
    }

    return apiMap;
};

let callStubVariable = (variable) => {
    return {
        code: `${variable}`,
        type: 'variable'
    };
};

let callStubFunction = (variable, params, stub) => {
    let code = `${variable}(`;

    let fullAtoms = true,
        paramValues = [];

    for (let i = 0; i < params.length; i++) {
        let param = params[i];
        if (isObject(param) && param.type === 'function') {
            code += param.code;
            fullAtoms = false;
        } else if (isObject(param) && param.type === 'variable') {
            code += param.code;
            fullAtoms = false;
        } else {
            paramValues.push(param);
            // validate atom param
            if (isFunction(stub.validateParamItem)) {
                stub.validateParamItem(param, i);
            }
            code += serializeAtom(param);
        }

        if (i < params.length - 1) {
            code += ',';
        }
    }

    if (fullAtoms && isFunction(stub.validateParams)) {
        stub.validateParams(paramValues);
    }

    code += ')';

    return {
        type: 'function',
        code
    };
};

let serializeAtom = (atom) => {
    if (typeof atom === 'string') {
        return JSON.stringify(atom);
    } else if (atom === null) {
        return 'null';
    } else if (atom === true) {
        return 'true';
    } else if (atom === false) {
        return 'false';
    } else if (typeof atom === 'number') {
        return atom + '';
    } else {
        throw new Error(`unexpected atom type in pfc, atom is ${atom}.`);
    }
};


/***/ }),

/***/ "./node_modules/pfc-compiler/src/util.js":
/*!***********************************************!*\
  !*** ./node_modules/pfc-compiler/src/util.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// ignore whitespace
let processTokens = (rawTokens) => {
    let tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
        let {
            text, tokenType
        } = rawTokens[i];

        let name = tokenType.name;

        if (name !== 'whitespace') { // ignore white space
            tokens.push({
                text,
                name
            });
        }
    }

    return tokens;
};

let getProductionId = (production) => {
    return `${production[0]} := ${production[1].join(' ')}`;
};

let isFunction = (v) => typeof v === 'function';

let isObject = (v) => v && typeof v === 'object';

module.exports = {
    processTokens,
    getProductionId,
    isFunction,
    isObject
};


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/stream-token-parser/index.js":
/*!***************************************************!*\
  !*** ./node_modules/stream-token-parser/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *
 * @readme-quick-run
 *
 * ## test tar=js r_c=streamTokenSpliter
 *
 * let {
 *     parser, WAIT, QUIT, MATCH
 * } = streamTokenSpliter;

 * let spliter = parser([{
 *     priority: 1,
 *     match: (prefix) => {
 *         if (/^\w*$/.test(prefix)) return MATCH;
 *         return QUIT;
 *     },
 *     name: 'word'
 * }, {
 *     priority: 0,
 *     match: (prefix) => {
 *         if (/^.$/.test(prefix)) return MATCH;
 *         return QUIT;
 *     },
 *     name: 'trash'
 * }]);
 *
 * let tokens1 = spliter('today=is __'); // chunk1
 * let tokens2 = spliter('a good day'); // chunk2
 * let tokens3 = spliter(null); // null means end of stream
 *
 * console.log(tokens1);
 * console.log('\n');
 * console.log(tokens2);
 * console.log('\n');
 * console.log(tokens3);
 */
module.exports = __webpack_require__(/*! ./src */ "./node_modules/stream-token-parser/src/index.js");


/***/ }),

/***/ "./node_modules/stream-token-parser/node_modules/bolzano/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/stream-token-parser/node_modules/bolzano/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject, funType, or, isString, isFalsy, likeArray
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let iterate = __webpack_require__(/*! ./lib/iterate */ "./node_modules/stream-token-parser/node_modules/bolzano/lib/iterate.js");

let {
    map, reduce, find, findIndex, forEach, filter, any, exist, compact
} = __webpack_require__(/*! ./lib/fp */ "./node_modules/stream-token-parser/node_modules/bolzano/lib/fp.js");

let contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;

let difference = (list1, list2, fopts) => {
    return reduce(list1, (prev, item) => {
        if (!contain(list2, item, fopts) &&
            !contain(prev, item, fopts)) {
            prev.push(item);
        }
        return prev;
    }, []);
};

let union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));

let mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));

let setValueKey = (obj, value, key) => {
    obj[key] = value;
    return obj;
};

let interset = (list1, list2, fopts) => {
    return reduce(list1, (prev, cur) => {
        if (contain(list2, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, []);
};

let deRepeat = (list, fopts, init = []) => {
    return reduce(list, (prev, cur) => {
        if (!contain(prev, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, init);
};

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let flat = (list) => {
    if (likeArray(list) && !isString(list)) {
        return reduce(list, (prev, item) => {
            prev = prev.concat(flat(item));
            return prev;
        }, []);
    } else {
        return [list];
    }
};

module.exports = {
    flat,
    contain,
    difference,
    union,
    interset,
    map,
    reduce,
    iterate,
    find,
    findIndex,
    deRepeat,
    forEach,
    filter,
    any,
    exist,
    get,
    delay,
    mergeMap,
    compact
};


/***/ }),

/***/ "./node_modules/stream-token-parser/node_modules/bolzano/lib/fp.js":
/*!*************************************************************************!*\
  !*** ./node_modules/stream-token-parser/node_modules/bolzano/lib/fp.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let iterate = __webpack_require__(/*! ./iterate */ "./node_modules/stream-token-parser/node_modules/bolzano/lib/iterate.js");

let defauls = {
    eq: (v1, v2) => v1 === v2
};

let setDefault = (opts, defauls) => {
    for (let name in defauls) {
        opts[name] = opts[name] || defauls[name];
    }
};

let forEach = (list, handler) => iterate(list, {
    limit: (rets) => {
        if (rets === true) return true;
        return false;
    },
    transfer: handler,
    output: (prev, cur) => cur,
    def: false
});

let map = (list, handler, limit) => iterate(list, {
    transfer: handler,
    def: [],
    limit
});

let reduce = (list, handler, def, limit) => iterate(list, {
    output: handler,
    def,
    limit
});

let filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {
    handler && handler(cur, index, list) && prev.push(cur);
    return prev;
}, [], limit);

let find = (list, item, fopts) => {
    let index = findIndex(list, item, fopts);
    if (index === -1) return undefined;
    return list[index];
};

let any = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev && originLogic(curLogic);
}, true, falsyIt);

let exist = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev || originLogic(curLogic);
}, false, originLogic);

let findIndex = (list, item, fopts = {}) => {
    setDefault(fopts, defauls);

    let {
        eq
    } = fopts;
    let predicate = (v) => eq(item, v);
    let ret = iterate(list, {
        transfer: indexTransfer,
        limit: onlyOne,
        predicate,
        def: []
    });
    if (!ret.length) return -1;
    return ret[0];
};

let compact = (list) => reduce(list, (prev, cur) => {
    if (cur) prev.push(cur);
    return prev;
}, []);

let indexTransfer = (item, index) => index;

let onlyOne = (rets, item, name, domain, count) => count >= 1;

let falsyIt = v => !v;

let originLogic = v => !!v;

module.exports = {
    map,
    forEach,
    reduce,
    find,
    findIndex,
    filter,
    any,
    exist,
    compact
};


/***/ }),

/***/ "./node_modules/stream-token-parser/node_modules/bolzano/lib/iterate.js":
/*!******************************************************************************!*\
  !*** ./node_modules/stream-token-parser/node_modules/bolzano/lib/iterate.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, mapType
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

/**
 *
 * preidcate: chose items to iterate
 * limit: when to stop iteration
 * transfer: transfer item
 * output
 */
let iterate = funType((domain = [], opts = {}) => {
    let {
        predicate, transfer, output, limit, def
    } = opts;

    opts.predicate = predicate || truthy;
    opts.transfer = transfer || id;
    opts.output = output || toList;
    if (limit === undefined) limit = domain && domain.length;
    limit = opts.limit = stopCondition(limit);

    let rets = def;
    let count = 0;

    if (likeArray(domain)) {
        for (let i = 0; i < domain.length; i++) {
            let itemRet = iterateItem(domain, i, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    } else if (isObject(domain)) {
        for (let name in domain) {
            let itemRet = iterateItem(domain, name, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    }

    return rets;
}, [
    or(isObject, isFunction, isFalsy),
    or(isUndefined, mapType({
        predicate: or(isFunction, isFalsy),
        transfer: or(isFunction, isFalsy),
        output: or(isFunction, isFalsy),
        limit: or(isUndefined, isNumber, isFunction)
    }))
]);

let iterateItem = (domain, name, count, rets, {
    predicate, transfer, output, limit
}) => {
    let item = domain[name];
    if (limit(rets, item, name, domain, count)) {
        // stop
        return {
            stop: true,
            count,
            rets
        };
    }

    if (predicate(item)) {
        rets = output(rets, transfer(item, name, domain, rets), name, domain);
        count++;
    }
    return {
        stop: false,
        count,
        rets
    };
};

let stopCondition = (limit) => {
    if (isUndefined(limit)) {
        return falsy;
    } else if (isNumber(limit)) {
        return (rets, item, name, domain, count) => count >= limit;
    } else {
        return limit;
    }
};

let toList = (prev, v) => {
    prev.push(v);
    return prev;
};

let truthy = () => true;

let falsy = () => false;

let id = v => v;

module.exports = iterate;


/***/ }),

/***/ "./node_modules/stream-token-parser/src/buildFSM.js":
/*!**********************************************************!*\
  !*** ./node_modules/stream-token-parser/src/buildFSM.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const START_STATE = '__start__state__';

let {
    stateGraphDSL, DFA
} = __webpack_require__(/*! cl-fsm */ "./node_modules/cl-fsm/index.js");

/**
 * build a fda to do the matching work
 *
 * transit: (currentState, letter) -> nextState
 */
module.exports = (stateMap, accepts) => {
    let m = null;

    // parse stateMap
    let {
        transitions, acceptStateMap
    } = stateGraphDSL.transitionMaper(
        stateGraphDSL.g(START_STATE,
            stateGraphDSL.c(null, stateMap)),
        accepts);

    return (prefix, letter) => {
        if (prefix.length === 1) {
            m = new DFA(transitions, acceptStateMap);
            return m.transit(letter).type;
        } else {
            return m.transit(letter).type;
        }
    };
};


/***/ }),

/***/ "./node_modules/stream-token-parser/src/const.js":
/*!*******************************************************!*\
  !*** ./node_modules/stream-token-parser/src/const.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    WAIT: 2,
    MATCH: 1,
    QUIT: 0
};


/***/ }),

/***/ "./node_modules/stream-token-parser/src/findToken.js":
/*!***********************************************************!*\
  !*** ./node_modules/stream-token-parser/src/findToken.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    WAIT, MATCH
} = __webpack_require__(/*! ./const */ "./node_modules/stream-token-parser/src/const.js");

let {
    assembleToken
} = __webpack_require__(/*! ./util */ "./node_modules/stream-token-parser/src/util.js");

let filterTypes = (nextLetter, prefix, tokenTypes) => {
    let parts = [],
        matchs = [],
        independentType = null;

    let len = tokenTypes.length;

    for (let i = 0; i < len; i++) {
        let tokenType = tokenTypes[i];
        let ret = tokenType.match(prefix, nextLetter);

        if (ret === WAIT) {
            parts.push(tokenType);
        } else if (ret === MATCH) { // matched
            matchs.push(tokenType);
            parts.push(tokenType);
            if (!independentType && tokenType.independent) {
                independentType = tokenType;
            }
        }
    }

    return [parts, matchs, independentType];
};

let findToken = (retMatrix) => {
    let prev = null;

    for (let i = 0; i < retMatrix.length; i++) {
        let {
            prefix, matchTypes
        } = retMatrix[i];

        for (let j = 0; j < matchTypes.length; j++) {
            let tokenType = matchTypes[j];
            if (!prev ||
                tokenType.priority > prev.tokenType.priority ||
                (tokenType.priority === prev.tokenType.priority && prefix.length > prev.text.length)
            ) {
                prev = assembleToken(tokenType, prefix);
            }
        }
    }

    return prev;
};

module.exports = {
    findToken,
    filterTypes
};


/***/ }),

/***/ "./node_modules/stream-token-parser/src/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/stream-token-parser/src/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isString, funType, listType, isFunction, mapType, isFalsy, isNumber, or
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let {
    WAIT, MATCH, QUIT
} = __webpack_require__(/*! ./const */ "./node_modules/stream-token-parser/src/const.js");

let {
    stateGraphDSL
} = __webpack_require__(/*! cl-fsm */ "./node_modules/cl-fsm/index.js");

let buildFSM = __webpack_require__(/*! ./buildFSM */ "./node_modules/stream-token-parser/src/buildFSM.js");

let {
    map
} = __webpack_require__(/*! bolzano */ "./node_modules/stream-token-parser/node_modules/bolzano/index.js");

let {
    getMatch
} = __webpack_require__(/*! ./match */ "./node_modules/stream-token-parser/src/match.js");

let {
    findToken,
    filterTypes
} = __webpack_require__(/*! ./findToken */ "./node_modules/stream-token-parser/src/findToken.js");

let {
    assembleToken
} = __webpack_require__(/*! ./util */ "./node_modules/stream-token-parser/src/util.js");

/**
 *
 * A token spliter used to split stream string.
 *
 * When accept a chunk, parsing it at the same time.
 *
 * ## options
 *
 * tokenTypes = [
 *  {
 *      name,
 *      priority,
 *      match
 *  }
 * ]
 *
 * - priority
 *
 *    When meets ambiguity, priority will be helpful.
 *
 *    Assume we got two types: \w*, \s. When split "today is a good day". If we set \s has a higher priority, we will get ["t", "o", "d", "a", "y", " ", "i", "s", " ", "a", " ", "g", "o", "o", "d", " ", "d", "a", "y"], just one token. If we set \w* has a higher priority, we will get ["today", " ", "is", " ", "a", " ", "good", " ", "day"].
 *
 * - match (letter, prefix) -> WAIT | MATCH | QUIT
 *
 *     Because we are handling chunks, we need to know finished a chunk or not.
 *
 * ## rules
 *
 * - priority rule
 *
 * - longest matching
 *
 * eg: four rules a(def, 1), b(default[s?], 2), c(/\w\w+/, 0), d(_, 2)
 *
 * ```
 * input     isPart     match
 * d         (a, b, c)  ()
 * de        (a, b, c)  (c:0)
 * def       (a, b, c)  (a:1, c:0)
 * defa      (b, c)     (c:0)
 * defau     (b, c)     (c:0)
 * defaul    (b, c)     (c:0)
 * default   (b, c)     (b:2, c:0)
 * defaults  (b, c)     (b:2, c:0)
 * defaults_ ()         ()
 * ```
 *
 * When empty situation happend, analysis the process.
 *
 * ```
 * 1. possible situations
 *    de        (a, b, c)  (c:0)
 *    def       (a, b, c)  (a:1, c:0)
 *    defa      (b, c)     (c:0)
 *    defau     (b, c)     (c:0)
 *    defaul    (b, c)     (c:0)
 *    default   (b, c)     (b:2, c:0)
 *    defaults  (b, c)     (b:2, c:0)
 *
 * 2. for any rule (a, b, c) only consider it's biggest matching situation. (longest matching rule)
 *    def       (a, b, c)  (a:1)            longest for a
 *    defaults  (b, c)     (b:2, c:0)       longest for b and c
 *
 * 3. choose the highest priority rule. (priority rule)
 *    defaults (b:2)
 * ```
 */

let parser = funType((tokenTypes) => {
    tokenTypes = map(tokenTypes, (tokenType) => {
        let {
            priority, name, independent, match
        } = tokenType;

        name = name || (match && match.toString());

        match = getMatch(match);

        if (!isFunction(match)) {
            throw new Error(`Error match in token type ${strTokenType(tokenType)}`);
        }

        return {
            priority: priority || 0,
            name: name,
            match,
            independent
        };
    });

    let stock = '';

    return (chunk) => {
        if (chunk === null) { // means finished
            let tokens = splitTokensToEnd(stock, tokenTypes);

            stock = '';
            return tokens;
        }
        stock += chunk.toString();
        let {
            rest, tokens
        } = splitTokens(stock, tokenTypes);

        stock = rest;

        return tokens;
    };
}, [
    listType(mapType({
        priority: or(isFalsy, isNumber),
        name: or(isFalsy, isString)
    }))
]);

let strTokenType = ({
    priority, match, name, independent
}) => {
    return `{
        priority: ${priority},
        match: ${match},
        name: ${name},
        independent: ${independent}
    }`;
};

parser.parse = (str, tokenTypes) => {
    let parse = parser(tokenTypes);
    return parse(str).concat(parse(null));
};

let splitTokensToEnd = (stock, tokenTypes) => {
    let {
        tokens
    } = splitTokens(stock, tokenTypes, 'end');
    return tokens;
};

let splitTokens = (stock, tokenTypes, type) => {
    let ret;
    let tokens = [];
    while (stock && (ret = getToken(stock, tokenTypes, type))) {
        let {
            token, rest
        } = ret;
        stock = rest;

        tokens.push(token);
    }

    return {
        tokens,
        rest: stock
    };
};

/**
 * type = 'mid' | 'end'
 *
 * get toke from stock based on tokenTypes
 */
let getToken = (stock, tokenTypes, type = 'mid') => {
    let next = stock;

    let prefix = ''; // used to store current prefix
    let retMatrix = [];

    let restTypes = tokenTypes;

    while (next) {
        let nextLetter = next[0];
        prefix += nextLetter;

        // shorten next
        next = next.substring(1);
        let [partTypes, matchTypes, independentType] = filterTypes(nextLetter, prefix, restTypes);

        restTypes = partTypes; // reduce types

        // see if there is a independent token type
        // find independent token

        if (independentType) {
            return splitTokenRet(
                assembleToken(independentType, prefix),
                stock
            );
        }

        // obey longest match rule
        // no matchs futher, means look forward more won't get any matchs
        if (!partTypes.length && !matchTypes.length) {
            return fetchToken(stock, retMatrix, prefix);
        } else {
            retMatrix.push({
                partTypes,
                matchTypes,
                prefix
            });
        }
    }

    // if this is end, fetchToken
    if (prefix === stock && type === 'end') { // match stop point
        return fetchToken(stock, retMatrix, prefix);
    }

    return null;
};

let fetchToken = (stock, retMatrix, prefix) => {
    // empty
    let token = findToken(retMatrix);
    if (!token) {
        throw new Error(`Can not find token from prefix "${prefix}". And prefix is not any part of token. stock is "${stock}".`);
    }
    return splitTokenRet(token, stock);
};

let splitTokenRet = (token, stock) => {
    return {
        token,
        rest: stock.substring(token.text.length)
    };
};

module.exports = {
    parser, WAIT, QUIT, MATCH, stateGraphDSL, buildFSM
};


/***/ }),

/***/ "./node_modules/stream-token-parser/src/match.js":
/*!*******************************************************!*\
  !*** ./node_modules/stream-token-parser/src/match.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isString, isFunction
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let {
    MATCH, WAIT, QUIT
} = __webpack_require__(/*! ./const */ "./node_modules/stream-token-parser/src/const.js");

let stringMatch = (word) => (prefix) => {
    if (word === prefix) return MATCH;
    if (word.indexOf(prefix) !== -1) return WAIT;
    return QUIT;
};

let getMatch = (match) => {
    if (isFunction(match)) return match;
    if (isString(match)) return stringMatch(match);
    // TODO analysis regular expression
};

module.exports = {
    getMatch
};


/***/ }),

/***/ "./node_modules/stream-token-parser/src/util.js":
/*!******************************************************!*\
  !*** ./node_modules/stream-token-parser/src/util.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let assembleToken = (tokenType, prefix) => {
    return {
        tokenType,
        name: tokenType.name,
        text: prefix
    };
};

module.exports = {
    assembleToken
};


/***/ }),

/***/ "./node_modules/syntaxer/index.js":
/*!****************************************!*\
  !*** ./node_modules/syntaxer/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @readme-quick-run
 *
 * build LR1 table
 *
 * ## test tar=js r_c=syntaxer
 *
 * let {buildLR1Table} = syntaxer;
 * let lr1Table = buildLR1Table({
 *     startSymbol: 'S',
 *     N: ['S'],
 *     T: ['a'],
 *     productions: [
 *         ['S', ['a']] // s -> a
 *     ]
 * });
 * console.log(JSON.stringify(lr1Table, null, 4));
 */

/**
 * @readme-quick-run
 *
 * generate ast from LR table
 *
 * ## test tar=js r_c=syntaxer
 *
 * let {buildLR1Table, LR} = syntaxer;
 * let {ACTION, GOTO} = buildLR1Table({
 *     startSymbol: 'S',
 *     N: ['S'],
 *     T: ['a'],
 *     productions: [
 *         ['S', ['a']] // s -> a
 *     ]
 * });
 * let lrParse = LR(ACTION, GOTO);
 * lrParse({ // accept a token
 *   name: 'a',
 *   text: 'abc'
 * });
 * let ast = lrParse(null); // null as end symbol
 * console.log(JSON.stringify(ast, null, 4));
 */
module.exports = __webpack_require__(/*! ./src */ "./node_modules/syntaxer/src/index.js");


/***/ }),

/***/ "./node_modules/syntaxer/node_modules/bolzano/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/syntaxer/node_modules/bolzano/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject, funType, or, isString, isFalsy, likeArray
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let iterate = __webpack_require__(/*! ./lib/iterate */ "./node_modules/syntaxer/node_modules/bolzano/lib/iterate.js");

let {
    map, reduce, find, findIndex, forEach, filter, any, exist, compact, reverse, overArgs
} = __webpack_require__(/*! ./lib/fp */ "./node_modules/syntaxer/node_modules/bolzano/lib/fp.js");

let contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;

let difference = (list1, list2, fopts) => {
    return reduce(list1, (prev, item) => {
        if (!contain(list2, item, fopts) &&
            !contain(prev, item, fopts)) {
            prev.push(item);
        }
        return prev;
    }, []);
};

let union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));

let mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));

let setValueKey = (obj, value, key) => {
    obj[key] = value;
    return obj;
};

let interset = (list1, list2, fopts) => {
    return reduce(list1, (prev, cur) => {
        if (contain(list2, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, []);
};

let deRepeat = (list, fopts, init = []) => {
    return reduce(list, (prev, cur) => {
        if (!contain(prev, cur, fopts)) {
            prev.push(cur);
        }
        return prev;
    }, init);
};

/**
 * a.b.c
 */
let get = funType((sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    return reduce(parts, getValue, sandbox, invertLogic);
}, [
    isObject,
    or(isString, isFalsy)
]);

let getValue = (obj, key) => obj[key];

let invertLogic = v => !v;

let delay = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

let flat = (list) => {
    if (likeArray(list) && !isString(list)) {
        return reduce(list, (prev, item) => {
            prev = prev.concat(flat(item));
            return prev;
        }, []);
    } else {
        return [list];
    }
};

module.exports = {
    flat,
    contain,
    difference,
    union,
    interset,
    map,
    reduce,
    iterate,
    find,
    findIndex,
    deRepeat,
    forEach,
    filter,
    any,
    exist,
    get,
    delay,
    mergeMap,
    compact,
    reverse,
    overArgs
};


/***/ }),

/***/ "./node_modules/syntaxer/node_modules/bolzano/lib/fp.js":
/*!**************************************************************!*\
  !*** ./node_modules/syntaxer/node_modules/bolzano/lib/fp.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    iterate
} = __webpack_require__(/*! ./iterate */ "./node_modules/syntaxer/node_modules/bolzano/lib/iterate.js");

let {
    isFunction
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let defauls = {
    eq: (v1, v2) => v1 === v2
};

let setDefault = (opts, defauls) => {
    for (let name in defauls) {
        opts[name] = opts[name] || defauls[name];
    }
};

let forEach = (list, handler) => iterate(list, {
    limit: (rets) => {
        if (rets === true) return true;
        return false;
    },
    transfer: handler,
    output: (prev, cur) => cur,
    def: false
});

let map = (list, handler, limit) => iterate(list, {
    transfer: handler,
    def: [],
    limit
});

let reduce = (list, handler, def, limit) => iterate(list, {
    output: handler,
    def,
    limit
});

let filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {
    handler && handler(cur, index, list) && prev.push(cur);
    return prev;
}, [], limit);

let find = (list, item, fopts) => {
    let index = findIndex(list, item, fopts);
    if (index === -1) return undefined;
    return list[index];
};

let any = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev && originLogic(curLogic);
}, true, falsyIt);

let exist = (list, handler) => reduce(list, (prev, cur, index, list) => {
    let curLogic = handler && handler(cur, index, list);
    return prev || originLogic(curLogic);
}, false, originLogic);

let findIndex = (list, item, fopts = {}) => {
    setDefault(fopts, defauls);

    let {
        eq
    } = fopts;
    let predicate = isFunction(item) ? item : (v) => eq(item, v);
    let ret = iterate(list, {
        transfer: indexTransfer,
        limit: onlyOne,
        predicate,
        def: []
    });
    if (!ret.length) return -1;
    return ret[0];
};

let compact = (list) => reduce(list, (prev, cur) => {
    if (cur) prev.push(cur);
    return prev;
}, []);

let reverse = (list) => reduce(list, (prev, cur) => {
    prev.unshift(cur);
    return prev;
}, []);

let indexTransfer = (item, index) => index;

let onlyOne = (rets, item, name, domain, count) => count >= 1;

let falsyIt = v => !v;

let originLogic = v => !!v;

let overArgs = (func, transform) => {
    return (...args) => {
        let newArgs = transform(...args);
        return func(...newArgs);
    };
};

module.exports = {
    overArgs,
    map,
    forEach,
    reduce,
    find,
    findIndex,
    filter,
    any,
    exist,
    compact,
    reverse
};


/***/ }),

/***/ "./node_modules/syntaxer/node_modules/bolzano/lib/iterate.js":
/*!*******************************************************************!*\
  !*** ./node_modules/syntaxer/node_modules/bolzano/lib/iterate.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isPromise, likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, isReadableStream, mapType
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

/**
 * @param opts
 *      preidcate: chose items to iterate
 *      limit: when to stop iteration
 *      transfer: transfer item
 *      output
 *      def: default result
 */
let iterate = funType((domain, opts = {}) => {
    domain = domain || [];
    if (isPromise(domain)) {
        return domain.then(list => {
            return iterate(list, opts);
        });
    }
    return iterateList(domain, opts);
}, [
    or(isPromise, isObject, isFunction, isFalsy),
    or(isUndefined, mapType({
        predicate: or(isFunction, isFalsy),
        transfer: or(isFunction, isFalsy),
        output: or(isFunction, isFalsy),
        limit: or(isUndefined, isNumber, isFunction)
    }))
]);

let iterateList = (domain, opts) => {
    opts = initOpts(opts, domain);

    let rets = opts.def;
    let count = 0; // iteration times

    if (isReadableStream(domain)) {
        let index = -1;

        return new Promise((resolve, reject) => {
            domain.on('data', (chunk) => {
                // TODO try cache error
                let itemRet = iterateItem(chunk, domain, ++index, count, rets, opts);
                rets = itemRet.rets;
                count = itemRet.count;
                if (itemRet.stop) {
                    resolve(rets);
                }
            });
            domain.on('end', () => {
                resolve(rets);
            });
            domain.on('error', (err) => {
                reject(err);
            });
        });
    } else if (likeArray(domain)) {
        for (let i = 0; i < domain.length; i++) {
            let item = domain[i];
            let itemRet = iterateItem(item, domain, i, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    } else if (isObject(domain)) {
        for (let name in domain) {
            let item = domain[name];
            let itemRet = iterateItem(item, domain, name, count, rets, opts);
            rets = itemRet.rets;
            count = itemRet.count;
            if (itemRet.stop) return rets;
        }
    }

    return rets;
};

let initOpts = (opts, domain) => {
    let {
        predicate, transfer, output, limit
    } = opts;

    opts.predicate = predicate || truthy;
    opts.transfer = transfer || id;
    opts.output = output || toList;
    if (limit === undefined) limit = domain && domain.length;
    limit = opts.limit = stopCondition(limit);
    return opts;
};

let iterateItem = (item, domain, name, count, rets, {
    predicate, transfer, output, limit
}) => {
    if (limit(rets, item, name, domain, count)) {
        // stop
        return {
            stop: true,
            count,
            rets
        };
    }

    if (predicate(item)) {
        rets = output(rets, transfer(item, name, domain, rets), name, domain);
        count++;
    }
    return {
        stop: false,
        count,
        rets
    };
};

let stopCondition = (limit) => {
    if (isUndefined(limit)) {
        return falsy;
    } else if (isNumber(limit)) {
        return (rets, item, name, domain, count) => count >= limit;
    } else {
        return limit;
    }
};

let toList = (prev, v) => {
    prev.push(v);
    return prev;
};

let truthy = () => true;

let falsy = () => false;

let id = v => v;

module.exports = {
    iterate
};


/***/ }),

/***/ "./node_modules/syntaxer/src/LR/LR1/LR1CanonicalCollection.js":
/*!********************************************************************!*\
  !*** ./node_modules/syntaxer/src/LR/LR1/LR1CanonicalCollection.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    buildClosure
} = __webpack_require__(/*! ./closure */ "./node_modules/syntaxer/src/LR/LR1/closure.js");
let {
    reduce
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");

/**
 * input: grammer G
 *
 * output: LR(0) canonical collection
 *
 * item = [head, body, dotPosition];
 *
 * item set = [viable prefix, items]
 */
module.exports = (grammer, LR1Grammer, go) => {
    let {
        symbols
    } = grammer;

    let initClosure = buildClosure([
        LR1Grammer.initItem(grammer)
    ], grammer, LR1Grammer);

    let C = [initClosure];
    let canonicalCollectionMap = {};
    canonicalCollectionMap[initClosure.serializedText] = true;

    let appendedC = C;

    while (true) { // eslint-disable-line
        let newAppendedC = [];

        for (let i = 0; i < appendedC.length; i++) {
            let I = appendedC[i];
            let gotoSet = getGoToSymbolsSet(symbols, I, go);

            for (let j = 0; j < gotoSet.length; j++) {
                let state = gotoSet[j];
                let serializedText = state.serializedText;

                if (!canonicalCollectionMap[serializedText]) {
                    // add new state
                    newAppendedC.push(state);
                    canonicalCollectionMap[serializedText] = true;
                }
            }
        }

        if (!newAppendedC.length) break;

        appendedC = newAppendedC;
        C = C.concat(appendedC);
    }

    return C;
};

let getGoToSymbolsSet = (symbols, I, go) => {
    // for every symbol
    let set = reduce(symbols, (pre, X) => {
        let newState = go(I, X);

        if (newState && newState.items.length) {
            pre.push(newState);
        }
        return pre;
    }, []);

    return set;
};


/***/ }),

/***/ "./node_modules/syntaxer/src/LR/LR1/LR1Table.js":
/*!******************************************************!*\
  !*** ./node_modules/syntaxer/src/LR/LR1/LR1Table.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let LR1CanonicalCollection = __webpack_require__(/*! ./LR1CanonicalCollection */ "./node_modules/syntaxer/src/LR/LR1/LR1CanonicalCollection.js");
let {
    forEach, findIndex
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");
let GO = __webpack_require__(/*! ./go */ "./node_modules/syntaxer/src/LR/LR1/go.js");
let {
    LR1Itemer
} = __webpack_require__(/*! ../../base/LR1Item */ "./node_modules/syntaxer/src/base/LR1Item.js");
let {
    sameClosure
} = __webpack_require__(/*! ./closure */ "./node_modules/syntaxer/src/LR/LR1/closure.js");

module.exports = (grammer) => {
    let {
        END_SYMBOL, isTerminalSymbol, N
    } = grammer;

    let ACTION = [], // action table
        GOTO = []; // goto table

    let LR1Grammer = LR1Itemer(grammer);
    let go = GO(grammer, LR1Grammer);

    let C = LR1CanonicalCollection(grammer, LR1Grammer, go);

    forEach(C, (I, index) => {
        ACTION[index] = ACTION[index] || {};

        // item = [head, body, dotPosition, forwards]

        forEach(I.items, (item) => {
            // [S`→ S., $] ϵ Ii
            if (LR1Grammer.isAcceptItem(item)) {
                //
                ACTION[index][END_SYMBOL] = {
                    type: 'accept'
                };
            } else if (item.isReduceItem()) { // [A → α., a] ϵ Ii, A≠S`
                forEach(item.getForwards(), (a) => {
                    ACTION[index][a] = {
                        type: 'reduce',
                        production: item.getProduction()
                    };
                });
            } else if (isTerminalSymbol(item.getNextSymbol())) {
                let Ij = go(I, item.getNextSymbol());

                if (Ij && Ij.items.length) {
                    ACTION[index][item.getNextSymbol()] = {
                        type: 'shift',
                        state: getStateIndex(C, Ij)
                    };
                }
            }
        });
    });

    forEach(C, (I, index) => {
        GOTO[index] = GOTO[index] || {};
        forEach(N, (A) => {
            let Ij = go(I, A);
            if (Ij && Ij.items.length) {
                GOTO[index][A] = getStateIndex(C, Ij);
            }
        });
    });

    return {
        GOTO,
        ACTION
    };
};

let getStateIndex = (C, I) => findIndex(C, I, {
    eq: sameClosure
});


/***/ }),

/***/ "./node_modules/syntaxer/src/LR/LR1/closure.js":
/*!*****************************************************!*\
  !*** ./node_modules/syntaxer/src/LR/LR1/closure.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    reduce
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");

/**
 *
 * valide LR(1) item: LR(1) item [A→α.β, a] is valide for prefix ρ=δα, if exists:
 *      S *⇒ δAω ⇒ δαβω
 *
 * inference: if [A→α.Bβ,a] is valide for ρ=δα, and B→θ is a production, then for any b ϵ FIRST(βa), [B→.θ,b] is valide for predix ρ=δα
 *
 * LR(1) item: [head, body, dotPosition, [...forward]]
 *
 * important: when closure is builded, it's immutable
 */

let buildClosure = (items, grammer, LR1Grammer) => {
    let appendedItems = items;
    let itemsMap = {};
    let prefixMap = {};

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        itemsMap[item.serialize()] = true;
        prefixMap[item.serializePrefix()] = item;
    }

    while (true) { // eslint-disable-line
        let newAppendedItems = reduce(appendedItems, (prev, item) => {
            let newItems = LR1Grammer.expandItem(item);
            return prev.concat(newItems);
        }, []);

        let noRepeatedNewItems = [];

        for (let i = 0; i < newAppendedItems.length; i++) {
            let item = newAppendedItems[i];
            let itemId = item.serialize();

            if (!itemsMap[itemId]) {
                // add new item
                noRepeatedNewItems.push(item);
                itemsMap[item.serialize()] = true;
                let prefixCacheItem = prefixMap[item.serializePrefix()];
                if (prefixCacheItem) {
                    prefixMap[item.serializePrefix()] = prefixCacheItem.concatForwards(item.getForwards());
                } else {
                    prefixMap[item.serializePrefix()] = item;
                }
            }
        }

        if (!noRepeatedNewItems.length) break;

        items = items.concat(noRepeatedNewItems);
        appendedItems = noRepeatedNewItems;
    }

    let serializedText = JSON.stringify(Object.keys(itemsMap).sort());

    let result = [];

    for (let name in prefixMap) {
        result.push(prefixMap[name]);
    }

    return {
        items: result,
        serializedText
    };
};

let sameClosure = (closure1, closure2) => closure1.serializedText === closure2.serializedText;

module.exports = {
    buildClosure,
    sameClosure
};


/***/ }),

/***/ "./node_modules/syntaxer/src/LR/LR1/go.js":
/*!************************************************!*\
  !*** ./node_modules/syntaxer/src/LR/LR1/go.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    reduce, filter
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");

let {
    buildClosure
} = __webpack_require__(/*! ./closure */ "./node_modules/syntaxer/src/LR/LR1/closure.js");

/**
 * jump
 *
 * A→αX.β => A→α.Xβ
 *
 * J = go(I, X) = closure({A→αX.β | A→α.Xβ ϵ I})
 *
 * if one viable prefix of A→αX.β  of I is ρ=δα, then A→α.Xβ in J has viable prefix δαX.
 *
 * @param I
 *    [head, body, dotPosition]
 *
 * @param X
 *    symbol
 *
 * @param productions
 */
module.exports = (grammer, LR1Grammer) => {
    let getStartItems = (I, X) => {
        let nextSymbolX = filter(I.items, (item) => {
            return item.getNextSymbol() === X;
        });

        let startItems = reduce(nextSymbolX, (prev, item) => { // eslint-disable-line
            if (item.restIsNotEmpty()) {
                prev.push(item.nextPositionItem());
            }

            return prev;
        }, []);

        return startItems;
    };

    return (I, X) => {
        let targetClosure = null;

        I.cache_GOTO = I.cache_GOTO || {};

        if (I.cache_GOTO[X]) {
            targetClosure = I.cache_GOTO[X];
        } else {
            let startItems = getStartItems(I, X);

            targetClosure = buildClosure(
                startItems,

                grammer,

                LR1Grammer
            );

            I.cache_GOTO[X] = targetClosure;
        }

        return targetClosure;
    };
};


/***/ }),

/***/ "./node_modules/syntaxer/src/LR/index.js":
/*!***********************************************!*\
  !*** ./node_modules/syntaxer/src/LR/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * LR ananlysis algorithm
 *
 * input: grammer G's analysis table and a string ω
 * output: if ω ϵ L(G), get the bottom-up analysis, otherwise error
 *
 * - init: (S₀, a₁a₂...an$)
 *
 * - assume current configuration is (S₀X₁S₁...Sm, aiai₊₁...an$)
 *
 *    (1) if action[Sm, ai] = shift S, S = GOTO[Sm, ai], then we got new configuration:
 *          (S₀X₁S₁..XmSm ai S, ai₊₁...an$)
 *    (2) if action[Sm, ai] = reduce by A → β, |β| = r,then:
 *          S = GOTO[Sm₋r, A];
 *          (S₀X₁S₁...Xm₋rSm₋rAS, aiai₊₁...an$)
 *    (3) if action[Sm, ai] = accept, success
 *    (4) if action[Sm, ai] = error, error
 */

let {
    END_SYMBOL, EXPAND_START_SYMBOL
} = __webpack_require__(/*! ../base/constant */ "./node_modules/syntaxer/src/base/constant.js");

let {
    initAST,
    reduceAST,
    appendToken
} = __webpack_require__(/*! ../reduceAst */ "./node_modules/syntaxer/src/reduceAst.js");

/**
 * configuration = [stack, tokens]
 *
 * stack = [S₀X₁S₁...XmSm], Xi ϵ T U N, Si stands for state
 *
 * @param action function (state, termalSymbol) -> shift | reduce | accept | error
 *      return of action function, is a object: {type, production, errorMsg}
 *      production = [head, body:[]]
 */
module.exports = (ACTION, GOTO, {
    reduceHandler,
    acceptHandler
} = {}) => {
    // initial configuration
    let configuration = initConfiguration();

    // initial ast
    let ast = initAST(EXPAND_START_SYMBOL);

    let action = (state, token) => {
        let act = ACTION[state][token.name];
        if (!act) {
            return {
                type: 'error',
                errorMsg: `unexpected symbol (token.name) ${token.name}, token (token.text) is ${token.text}. Try to find ACTION from state ${state}.`
            };
        } else {
            return act;
        }
    };

    let goTo = (state, token) => {
        let nextState = GOTO[state][token.name];
        if (nextState === undefined) {
            throw new Error(`fail to goto state from ${state} and symbol (token.name) is ${token.name}, token (token.text) is ${token.text}. Try to do GOTO from state ${state}, but next state not exists.`);
        }
        return nextState;
    };

    let analysis = () => {
        let topState = getTopState(configuration);
        let token = getNextInputToken(configuration);
        // look up action
        let ret = action(topState, token);

        switch (ret.type) {
            case 'shift':
                shift(configuration, ret.state, token);
                ast = appendToken(ast, token);
                break;
            case 'reduce':
                // reduce production
                ast = reduce(ast, ret.production, configuration, goTo, reduceHandler);
                break;
            case 'error':
                // error handle
                throw new Error(ret.errorMsg);
            case 'accept':
                // clear configration
                configuration[1] = [];
                acceptHandler && acceptHandler(ast); // accept handle
                break;
            default:
                throw new Error(`unexpected action type ${ret.type}, when try to recoginise from [${topState}, ${token.name}]. Token is ${token.text}`);
        }
    };

    /**
     * @param token Object
     *   accept token as stream
     *   token = {
     *        name,
     *        other...
     *   }
     *
     *   if toke is null, means end of input
     */
    return (token) => {
        if (token === null) {
            // check state of the configuration
            configuration[1].push({
                name: END_SYMBOL
            });
            while (configuration[1].length) {
                analysis();
            }

            return ast;
        } else {
            // add token to configuration
            configuration[1].push(token);
            while (configuration[1].length > 1) {
                analysis();
            }
        }
    };
};

let initConfiguration = () => {
    // initial configuration
    return [
        [0], // stack
        [] // input
    ];
};

// (S₀X₁S₁..XmSm, aiai₊₁...an$) -> (S₀X₁S₁..XmSm ai S, ai₊₁...an$)
// S = GOTO(Sm, ai);
let shift = (configuration, state, token) => {
    let stack = configuration[0];
    let tokens = configuration[1];
    stack.push(token, state);
    tokens.shift();
};

// (S₀X₁S₁..XmSm, aiai₊₁...an$) -> (S₀X₁S₁...Xm₋rSm₋rAS, aiai₊₁...an$)
// A → β, r = |β|
// S = GOTO(Sm₋r, A)
let reduce = (ast, [head, body], configuration, goTo, reduceHandler) => {
    let stack = configuration[0];
    let reducedTokens = [];
    for (let i = 0; i < body.length; i++) {
        stack.pop(); // pop state
        reducedTokens.push(stack.pop()); // pop token
    }
    let top = getTopState(configuration);
    stack.push(head);
    stack.push(goTo(top, {
        name: head,
        text: `[none terminal symbol] ${head}`
    }));

    let {newAst, midNode} = reduceAST(ast,
        ast.children.length - body.length, // start position
        ast.children.length - 1, // end position
        head);

    reduceHandler && reduceHandler([head, body], midNode, reducedTokens, ast);
    return newAst;
};

let getTopState = (configuration) => {
    let stack = configuration[0];
    return stack[stack.length - 1];
};

let getNextInputToken = (configuration) => {
    let tokens = configuration[1];
    return tokens[0];
};


/***/ }),

/***/ "./node_modules/syntaxer/src/base/LR1Item.js":
/*!***************************************************!*\
  !*** ./node_modules/syntaxer/src/base/LR1Item.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let First = __webpack_require__(/*! ./first */ "./node_modules/syntaxer/src/base/first.js");

let {
    union, reduce, filter, flat, map
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");

let LR1Itemer = (grammer) => {
    let {
        END_SYMBOL,
        isNoneTerminalSymbol,
        getProductionsOf
    } = grammer;

    let first = First(grammer);

    let buildLR1Item = (production, dotPosition, forwards) => {
        let {
            getHead, getBody, isTerminalSymbol, isEndSymbol
        } = grammer;

        // [A → α.Bβ, a]
        let getNextSymbol = () => {
            return getBody(production)[dotPosition];
        };

        let getForwards = () => forwards;

        let afterNextRest = () => getBody(production).slice(dotPosition + 1);

        let list = () => [getHead(production), getBody(production), dotPosition, forwards];

        // change the forwards
        let concatForwards = (newForwards) => {
            return buildLR1Item(production, dotPosition, union(forwards, newForwards));
        };

        let adjoints = null;

        // [A → α.Bβ, a], FIRST(βa)
        let getAdjoints = () => {
            if (adjoints === null) {
                let beta = afterNextRest();
                let forwards = getForwards();

                let ret = reduce(forwards, (prev, letter) => {
                    let firstSet = beta.length ? first(beta.concat([letter])) : [letter];
                    return prev.concat(filter(firstSet, (item) => isTerminalSymbol(item) || isEndSymbol(item)));
                }, []);

                adjoints = ret;

                return ret;
            } else {
                return adjoints;
            }
        };

        // rest = ε && a = $
        let isReducedItem = () => {
            return !afterNextRest().length && getForwards().length === 1 && isEndSymbol(getForwards()[0]);
        };

        let restIsNotEmpty = () => getBody(production).length && dotPosition < getBody(production).length;

        let nextPositionItem = () => {
            return buildLR1Item(production, dotPosition + 1, forwards, grammer);
        };

        let getGrammer = () => grammer;

        // [A → α., a] ϵ Ii, A≠S`
        let isReduceItem = () => {
            return dotPosition === getBody(production).length;
        };

        let getProduction = () => production;

        let serializeId = null;

        let serialize = () => {
            if (serializeId === null) {
                serializeId = JSON.stringify([production, dotPosition, forwards.sort()]);
            }
            return serializeId;
        };

        let serializePrefixId = null;
        let serializePrefix = () => {
            if (serializePrefixId === null) {
                serializePrefixId = JSON.stringify([production, dotPosition]);
            }

            return serializePrefixId;
        };

        return {
            getNextSymbol,
            getProduction,
            getForwards,
            afterNextRest,
            list,
            concatForwards,
            getAdjoints,
            isReducedItem,
            restIsNotEmpty,
            nextPositionItem,
            getGrammer,
            isReduceItem,
            serialize,
            serializePrefix
        };
    };

    // S` -> S.
    var acceptItem = () => {
        return buildLR1Item([grammer.EXPAND_START_SYMBOL, [grammer.startSymbol]], 1, [grammer.END_SYMBOL]);
    };

    let isAcceptItem = (item) => {
        return sameItem(acceptItem(item.getGrammer()), item);
    };

    var sameItem = (item1, item2) => {
        return item1.serialize() === item2.serialize();
    };

    let initItem = () => {
        let item = buildLR1Item(
            [grammer.EXPAND_START_SYMBOL, [grammer.startSymbol]],
            0, [grammer.END_SYMBOL]
        );

        return item;
    };

    let fromList = ([head, body, dotPosition, forwards]) => {
        return buildLR1Item([head, body], dotPosition, forwards);
    };

    /**
     * [B → .γ, b]
     */
    let supItem = (production, symbol) => {
        return buildLR1Item(production, 0, [symbol]);
    };

    let expandCacheMap = {};
    let expandItem = (item) => {
        let serializeId = item.serialize();

        if (expandCacheMap[serializeId]) {
            return expandCacheMap[serializeId].slice(0);
        }

        let {
            getNextSymbol,
            getAdjoints,
            isReducedItem
        } = item;
        let next = getNextSymbol();

        if (!next || !isNoneTerminalSymbol(next)) return [];

        let nextProductions = getProductionsOf(next);

        let newItems = flat(map(nextProductions, (production) => isReducedItem() ? [
            supItem(production, END_SYMBOL)
        ] : map(getAdjoints(), (b) => supItem(production, b))));

        expandCacheMap[serializeId] = newItems;

        return newItems;
    };

    return {
        expandItem,
        buildLR1Item,
        isAcceptItem,
        sameItem,
        initItem,
        fromList,
        supItem
    };
};

module.exports = {
    LR1Itemer
};


/***/ }),

/***/ "./node_modules/syntaxer/src/base/constant.js":
/*!****************************************************!*\
  !*** ./node_modules/syntaxer/src/base/constant.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    END_SYMBOL: '$',
    EXPAND_START_SYMBOL: 'S`',
    EPSILON: null
};


/***/ }),

/***/ "./node_modules/syntaxer/src/base/ctxFreeGrammer.js":
/*!**********************************************************!*\
  !*** ./node_modules/syntaxer/src/base/ctxFreeGrammer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * context free grammer
 *    terminal symbol
 *    non-terminal symbol
 *    begin symbol
 *    production
 *    left -> right
 *
 * production = [head, body]
 *
 * TODO validate
 */

const {
    END_SYMBOL, EXPAND_START_SYMBOL, EPSILON
} = __webpack_require__(/*! ./constant */ "./node_modules/syntaxer/src/base/constant.js");

/**
 * context free grammer is read-only
 */

module.exports = ({
    startSymbol,
    T, N,
    productions
}) => {
    let symbols = T.concat(N);

    // cache
    let noneTerminalProductionMap = getNoneTerminalProductionMap(productions);
    let terminalMap = listToExistMap(T);
    let noneTerminalMap = listToExistMap(N);

    let isTerminalSymbol = (symbol) => !!terminalMap[symbol];
    let isNoneTerminalSymbol = (symbol) => !!noneTerminalMap[symbol];

    /**
     * get all the productions startSymbol with none terminal symbol
     */
    let getProductionsOf = (noneTerminal) => noneTerminalProductionMap[noneTerminal];

    // A -> ε
    let isEmptyProduction = (production) => { // eslint-disable-body
        return !getBody(production).length;
    };

    let getBody = (production) => production[1];

    let getHead = (production) => production[0];

    let isEndSymbol = (v) => v === END_SYMBOL;

    let getBodyId = (body) => JSON.stringify(body);

    return {
        isTerminalSymbol,
        isNoneTerminalSymbol,
        getProductionsOf,
        isEmptyProduction,
        getBody,
        getBodyId,
        getHead,
        EPSILON,
        END_SYMBOL,
        EXPAND_START_SYMBOL,
        startSymbol,
        productions,
        isEndSymbol,
        symbols,
        N
    };
};

let listToExistMap = (arr) => {
    let map = {};
    let tLen = arr.length;
    for (let i = 0; i < tLen; i++) {
        map[arr[i]] = true;
    }
    return map;
};

/**
 * get the production map, key is none terminal symbol, keys is the set of producitons
 */
let getNoneTerminalProductionMap = (producitons) => {
    let productionMap = {};

    let productionLen = producitons.length;
    for (let i = 0; i < productionLen; i++) {
        let production = producitons[i];
        let head = production[0];
        productionMap[head] = productionMap[head] || [];
        productionMap[head].push(production);
    }

    return productionMap;
};


/***/ }),

/***/ "./node_modules/syntaxer/src/base/first.js":
/*!*************************************************!*\
  !*** ./node_modules/syntaxer/src/base/first.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    contain, union, reduce, difference, forEach
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");

let {
    isArray
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

module.exports = (grammer) => {
    // cache first set
    let firstMap = {};

    /**
     * first set of sentential form
     *
     * α ϵ (T U N)*
     *
     * FIRST(α) = { a | α *=> a..., a ϵ T }
     *
     * if α *=> ε, then ε ϵ FIRST(α)
     *
     * A → ε => ['A', []]
     *
     * using null stand for ε
     */

    let first = (X) => {
        if (firstMap[X]) return firstMap[X];
        let ret = firstSet(X);
        firstMap[X] = ret;
        return ret;
    };

    let firstSet = (X) => {
        let {
            isTerminalSymbol,
            getProductionsOf,
            isEmptyProduction,
            getBody,
            EPSILON
        } = grammer;

        if (isTerminalSymbol(X)) {
            return [X];
        } else {
            // find all productions start with X
            let ps = getProductionsOf(X);

            return reduce(ps, (prev, production) => {
                let body = getBody(production);

                if (isEmptyProduction(production)) {
                    return union(prev, [EPSILON]); // union ε
                } else {
                    if (isTerminalSymbol(body[0])) {
                        return union(prev, [body[0]]);
                    } else {
                        return union(prev, firstList(body, grammer));
                    }
                }
            }, []);
        }
    };

    let firstListMap = {};
    /**
     * [...ab...]
     */
    let firstList = (body) => {
        let {
            EPSILON, getBodyId
        } = grammer;

        let bodyId = getBodyId(body);
        if (firstListMap[bodyId]) {
            return firstListMap[bodyId];
        }

        let ret = [];
        forEach(body, (y, index) => {
            let set = first(y);

            ret = union(ret, difference(set, [EPSILON]));
            if (!contain(set, EPSILON)) { // stop
                return true;
            }

            if (index === body.length - 1) {
                ret = union(ret, [EPSILON]);
            }
        });

        firstListMap[bodyId] = ret;
        return ret;
    };

    return (alpha) => {
        if (isArray(alpha)) {
            return firstList(alpha);
        } else {
            return first(alpha);
        }
    };
};


/***/ }),

/***/ "./node_modules/syntaxer/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/syntaxer/src/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * syntax analysis
 *
 * background knowledge
 *
 * 1. context free grammer
 *    terminal symbol
 *    non-terminal symbol
 *    begin symbol
 *    production
 *          left -> right
 * 2. shift-in reduce
 */

let LR = __webpack_require__(/*! ./LR */ "./node_modules/syntaxer/src/LR/index.js");
let LR1Table = __webpack_require__(/*! ./LR/LR1/LR1Table */ "./node_modules/syntaxer/src/LR/LR1/LR1Table.js");
let ctxFreeGrammer = __webpack_require__(/*! ./base/ctxFreeGrammer */ "./node_modules/syntaxer/src/base/ctxFreeGrammer.js");
let {
    forEach
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");

/**
 * just used for testing
 */
let parse = (g, handlers) => {
    let {
        ACTION, GOTO
    } = LR1Table(ctxFreeGrammer(g));

    return (tokens) => {
        let parser = LR(ACTION, GOTO, handlers);
        forEach(tokens, parser);
        return parser(null);
    };
};

let buildLR1Table = (g) => {
    let grammer = ctxFreeGrammer(g);
    return LR1Table(grammer);
};

module.exports = {
    LR, LR1Table, parse, ctxFreeGrammer, buildLR1Table
};


/***/ }),

/***/ "./node_modules/syntaxer/src/reduceAst.js":
/*!************************************************!*\
  !*** ./node_modules/syntaxer/src/reduceAst.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * reduce production to generate a AST
 *
 * s *rm=> αAω *rm=> αβω
 *
 * reduce from αβω to αAω by A → β
 *
 * current AST:
 *           S
 *        /  |  \
 *       /  / \  \
 *      α    β    ω
 *     / \  / \  / \
 *     ...  ...  ...
 *
 * reduce by A → β
 *
 * result AST:
 *           S
 *        /  |  \
 *       /   A   \
 *      /   / \   \
 *     α     β     ω
 *    / \   / \   / \
 *    ...   ...   ...
 *
 * AST data structure
 * node = {
 *      type: terminal | none-terminal,
 *      symbol,
 *      token,
 *      children: [node]
 * }
 *
 * reduce start point: a token list
 * reduce end point: S → r
 *
 * 1. init AST from a list of token
 *
 * 2. reduce production to expand AST
 */

let {
    map
} = __webpack_require__(/*! bolzano */ "./node_modules/syntaxer/node_modules/bolzano/index.js");

const TERMINAL_TYPE = 'terminal';
const NONE_TERMINAL_TYPE = 'none-terminal';

/**
 * @param startSymbol String
 * @param tokens Array
 *
 * @return ast Object
 *
 * tokens = [{
 *     name,
 *     text
 * }]
 */
let initAST = (startSymbol, tokens = []) => {
    return {
        type: NONE_TERMINAL_TYPE,
        symbol: startSymbol,
        children: map(tokens, tokenToLeaf)
    };
};

let tokenToLeaf = (token) => {
    return {
        type: TERMINAL_TYPE,
        symbol: token.name,
        token
    };
};

/**
 * s *rm=> αAω *rm=> αβω
 *
 * reduce from αβω to αAω by A → β
 *
 * @param ast
 * @param start
 * @param end
 * @param leftSymbol
 *
 * @return ast
 *
 * β = ast.children[start] ~ ast.children[end]
 *
 * 1. remove β from ast, replace with A
 * 2. make every elements of β as A's child
 */
let reduceAST = (ast, start = 0, end = 0, leftSymbol) => {
    // generate a new middle node, which will hang beta nodes
    let midNode = {
        type: NONE_TERMINAL_TYPE,
        symbol: leftSymbol
    };

    let beta = ast.children.splice(start, end - start + 1, midNode);
    midNode.children = beta;

    return {newAst: ast, midNode};
};

/**
 * @param ast
 * @param token
 */
let appendToken = (ast, token) => {
    ast.children.push(tokenToLeaf(token));
    return ast;
};

module.exports = {
    initAST,
    reduceAST,
    appendToken
};


/***/ }),

/***/ "./node_modules/tree-script/grammer/tokenTypes.js":
/*!********************************************************!*\
  !*** ./node_modules/tree-script/grammer/tokenTypes.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    stringGraph,
    numberGraph
} = __webpack_require__(/*! cl-fsm/apply/json */ "./node_modules/cl-fsm/apply/json/index.js");

let {
    buildFSM
} = __webpack_require__(/*! stream-token-parser */ "./node_modules/stream-token-parser/index.js");

let FSM = __webpack_require__(/*! cl-fsm */ "./node_modules/cl-fsm/index.js");
let {
    stateGraphDSL
} = FSM;

let {
    g,
    c,
    union,
    sequence,
    range,
    circle
} = stateGraphDSL;

let whitespace = union(' ', '\f', '\n', '\r', '\t', '\v', '\u00a0', '\u1680', '\u180e', '\u2000-', '\u200a', '\u2028', '\u2029', '\u202f', '\u205f', '\u3000', '\ufeff');

// .abcbf
// .0
// ._
let nodeName = g(sequence(
    '.',
    union('_', '%', range('a', 'z'), range('A', 'Z'), range('0', '9')),
    circle(union('_', '%', range('a', 'z'), range('A', 'Z'), range('0', '9')))
));

let variableName = g(sequence(
    union('_', range('a', 'z'), range('A', 'Z')),
    circle(union('_', range('a', 'z'), range('A', 'Z'), range('0', '9')))
));

let nodeNameVariable = g(sequence(
    '.',
    '[',

    circle(whitespace, g(sequence(
        union('_', range('a', 'z'), range('A', 'Z')),

        circle(union('_', range('a', 'z'), range('A', 'Z'), range('0', '9')),
            circle(whitespace,
                g(c(']'))
            ),
        ))))
));

module.exports = [

    {
        priority: 1,
        match: 'true',
        name: 'true'
    }, {
        priority: 1,
        match: 'false',
        name: 'false'
    }, {
        priority: 1,
        match: 'null',
        name: 'null'
    }, {
        priority: 1,
        match: buildFSM(stringGraph),
        name: 'string'
    }, {
        priority: 1,
        match: buildFSM(numberGraph),
        name: 'number'
    },

    {
        priority: 1,
        match: buildFSM(nodeName),
        name: 'nodeName'
    },
    {
        priority: 1,
        match: buildFSM(nodeNameVariable),
        name: 'nodeNameVariable'
    },
    {
        priority: 1,
        match: buildFSM(variableName),
        name: 'variableName'
    },
    {
        priority: 1,
        match: '=',
        name: 'assign'
    },
    {
        priority: 1,
        match: '-',
        name: 'delete'
    },
    {
        priority: 1,
        match: '+',
        name: 'append'
    },
    {
        priority: 1,
        match: ';',
        name: 'semicolon'
    },
    {
        priority: 1,
        match: '(',
        name: 'leftBracket'
    },
    {
        priority: 1,
        match: ')',
        name: 'rightBracket'
    },
    {
        priority: 1,
        match: ',',
        name: 'comma'
    },
    {
        priority: 1,
        match: buildFSM(g(
            c(whitespace)
        )),
        name: 'whitespace'
    }
];


/***/ }),

/***/ "./node_modules/tree-script/index.js":
/*!*******************************************!*\
  !*** ./node_modules/tree-script/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src */ "./node_modules/tree-script/src/index.js");


/***/ }),

/***/ "./node_modules/tree-script/lib/jsonTree.js":
/*!**************************************************!*\
  !*** ./node_modules/tree-script/lib/jsonTree.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    autoId,
    isObject,

    modifySuccess,
    removeNoneExist,
    removeSuccess
} = __webpack_require__(/*! ./util */ "./node_modules/tree-script/lib/util.js");

module.exports = (jsonData, {
    missingValue = undefined
} = {}) => {
    let queryByPath = (path) => {
        let cur = jsonData;
        for (let i = 0; i < path.length; i++) {
            if (!isObject(cur)) {
                return missingValue;
            } else {
                if (cur.hasOwnProperty(path[i])) {
                    cur = cur[path[i]];
                } else {
                    return missingValue;
                }
            }
        }

        return cur;
    };

    let setByPath = (path, value) => {
        let parent = jsonData;

        for (let i = 0; i < path.length - 1; i++) {
            let part = path[i];
            let next = parent[part];
            if (!isObject(next)) { // if is not object, just override to a empty object
                next = {}; // create a new middle node
                parent[part] = next;
            }
            parent = next;
        }

        parent[path[path.length - 1]] = value; // set value
        return modifySuccess(path, value);
    };

    return {
        queryByPath,

        setByPath,

        removeByPath: (path) => {
            let parentPath = path.slice(0, path.length - 1);
            let lastKey = path[path.length - 1];
            let parent = queryByPath(parentPath);
            if (parent === missingValue || !isObject(parent) || !parent.hasOwnProperty(lastKey)) {
                return removeNoneExist(path);
            } else {
                delete parent[lastKey];
                return removeSuccess(path);
            }
        },

        appendByPath: (path, value) => {
            return setByPath(path.concat([autoId()]), value);
        }
    };
};


/***/ }),

/***/ "./node_modules/tree-script/lib/util.js":
/*!**********************************************!*\
  !*** ./node_modules/tree-script/lib/util.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");

let autoId = () => {
    let time = new Date().getTime(); // used to sort by time
    // generate id
    return `_gid_${time}_${uuidv4().replace(/-/g, '_')}`;
};

let isObject = v => v && typeof v === 'object';

const O_T_MODIFY = 'update';
const O_T_REMOVE = 'delete';
const T_SUCCESS = 'success';

const ERR_T_REMOVE_NONE_EXIST = 'remove_none_exist';

let modifySuccess = (path, value) => {
    return {
        operationType: O_T_MODIFY,
        resultType: T_SUCCESS,

        path,
        value: value && value.toString()
    };
};

let removeNoneExist = (path) => {
    return {
        operationType: O_T_REMOVE,
        resultType: ERR_T_REMOVE_NONE_EXIST,

        path
    };
};

let removeSuccess = (path) => {
    return {
        operationType: O_T_REMOVE,
        resultType: T_SUCCESS,

        path
    };
};

module.exports = {
    autoId,
    isObject,

    modifySuccess,
    removeNoneExist,
    removeSuccess
};


/***/ }),

/***/ "./node_modules/tree-script/res/lr1Table.js":
/*!**************************************************!*\
  !*** ./node_modules/tree-script/res/lr1Table.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={"GOTO":[{"PROGRAM":11,"EXPRESSION_LIST":12,"EXPRESSION":13,"UPDATE_EXPRESSION":14,"QUERY_EXPRESSION":15,"PATH":16,"ATOM_DATA":17},{"PATH":20},{"PATH":23},{},{"PATH":25},{"PATH":26},{},{},{},{},{},{},{},{},{},{},{},{},{"PATH":29},{"PATH":30},{},{"PATH":31},{"PATH":32},{},{"QUERY_EXPRESSION":43,"QUERY_EXPRESSION_LIST":44,"PATH":45,"ATOM_DATA":46},{},{},{"EXPRESSION_LIST":47,"EXPRESSION":13,"UPDATE_EXPRESSION":14,"QUERY_EXPRESSION":15,"PATH":16,"ATOM_DATA":17},{"QUERY_EXPRESSION":48,"PATH":49,"ATOM_DATA":17},{},{},{},{},{"QUERY_EXPRESSION":50,"PATH":49,"ATOM_DATA":17},{},{},{"PATH":52},{"PATH":53},{},{},{},{},{},{},{},{},{},{},{},{},{},{"QUERY_EXPRESSION":43,"QUERY_EXPRESSION_LIST":57,"PATH":45,"ATOM_DATA":46},{},{},{"QUERY_EXPRESSION":43,"QUERY_EXPRESSION_LIST":58,"PATH":45,"ATOM_DATA":46},{},{},{},{},{}],"ACTION":[{"$":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"variableName":{"type":"shift","state":3},"delete":{"type":"shift","state":1},"append":{"type":"shift","state":2},"true":{"type":"shift","state":6},"false":{"type":"shift","state":7},"null":{"type":"shift","state":8},"string":{"type":"shift","state":9},"number":{"type":"shift","state":10},"nodeName":{"type":"shift","state":4},"nodeNameVariable":{"type":"shift","state":5}},{"nodeName":{"type":"shift","state":18},"nodeNameVariable":{"type":"shift","state":19}},{"nodeName":{"type":"shift","state":21},"nodeNameVariable":{"type":"shift","state":22}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":24}},{"$":{"type":"reduce","production":["PATH",["nodeName"]]},"assign":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":4},"nodeNameVariable":{"type":"shift","state":5}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"assign":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":4},"nodeNameVariable":{"type":"shift","state":5}},{"$":{"type":"reduce","production":["ATOM_DATA",["true"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["false"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["null"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["string"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"$":{"type":"reduce","production":["ATOM_DATA",["number"]]},"semicolon":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"$":{"type":"accept"}},{"$":{"type":"reduce","production":["PROGRAM",["EXPRESSION_LIST"]]}},{"$":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION"]]},"semicolon":{"type":"shift","state":27}},{"$":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["UPDATE_EXPRESSION"]]}},{"$":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["EXPRESSION",["QUERY_EXPRESSION"]]}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"assign":{"type":"shift","state":28}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"$":{"type":"reduce","production":["PATH",["nodeName"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":18},"nodeNameVariable":{"type":"shift","state":19}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":18},"nodeNameVariable":{"type":"shift","state":19}},{"$":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["delete","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":21},"nodeNameVariable":{"type":"shift","state":22}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":21},"nodeNameVariable":{"type":"shift","state":22}},{"assign":{"type":"shift","state":33}},{"rightBracket":{"type":"shift","state":35},"variableName":{"type":"shift","state":34},"true":{"type":"shift","state":38},"false":{"type":"shift","state":39},"null":{"type":"shift","state":40},"string":{"type":"shift","state":41},"number":{"type":"shift","state":42},"nodeName":{"type":"shift","state":36},"nodeNameVariable":{"type":"shift","state":37}},{"$":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"assign":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"assign":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"$":{"type":"reduce","production":["EXPRESSION",[]]},"semicolon":{"type":"reduce","production":["EXPRESSION",[]]},"variableName":{"type":"shift","state":3},"delete":{"type":"shift","state":1},"append":{"type":"shift","state":2},"true":{"type":"shift","state":6},"false":{"type":"shift","state":7},"null":{"type":"shift","state":8},"string":{"type":"shift","state":9},"number":{"type":"shift","state":10},"nodeName":{"type":"shift","state":4},"nodeNameVariable":{"type":"shift","state":5}},{"variableName":{"type":"shift","state":3},"true":{"type":"shift","state":6},"false":{"type":"shift","state":7},"null":{"type":"shift","state":8},"string":{"type":"shift","state":9},"number":{"type":"shift","state":10},"nodeName":{"type":"shift","state":18},"nodeNameVariable":{"type":"shift","state":19}},{"$":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"$":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"semicolon":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"assign":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"variableName":{"type":"shift","state":3},"true":{"type":"shift","state":6},"false":{"type":"shift","state":7},"null":{"type":"shift","state":8},"string":{"type":"shift","state":9},"number":{"type":"shift","state":10},"nodeName":{"type":"shift","state":18},"nodeNameVariable":{"type":"shift","state":19}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName"]]},"leftBracket":{"type":"shift","state":51}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"comma":{"type":"reduce","production":["PATH",["nodeName"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeName"]]},"nodeName":{"type":"shift","state":36},"nodeNameVariable":{"type":"shift","state":37}},{"comma":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeNameVariable"]]},"nodeName":{"type":"shift","state":36},"nodeNameVariable":{"type":"shift","state":37}},{"comma":{"type":"reduce","production":["ATOM_DATA",["true"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["true"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["false"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["false"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["null"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["null"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["string"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["string"]]}},{"comma":{"type":"reduce","production":["ATOM_DATA",["number"]]},"rightBracket":{"type":"reduce","production":["ATOM_DATA",["number"]]}},{"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION_LIST",["QUERY_EXPRESSION"]]},"comma":{"type":"shift","state":54}},{"rightBracket":{"type":"shift","state":55}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["ATOM_DATA"]]}},{"$":{"type":"reduce","production":["EXPRESSION_LIST",["EXPRESSION","semicolon","EXPRESSION_LIST"]]}},{"$":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["PATH","assign","QUERY_EXPRESSION"]]}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["PATH"]]}},{"$":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]},"semicolon":{"type":"reduce","production":["UPDATE_EXPRESSION",["append","PATH","assign","QUERY_EXPRESSION"]]}},{"rightBracket":{"type":"shift","state":56},"variableName":{"type":"shift","state":34},"true":{"type":"shift","state":38},"false":{"type":"shift","state":39},"null":{"type":"shift","state":40},"string":{"type":"shift","state":41},"number":{"type":"shift","state":42},"nodeName":{"type":"shift","state":36},"nodeNameVariable":{"type":"shift","state":37}},{"comma":{"type":"reduce","production":["PATH",["nodeName","PATH"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeName","PATH"]]}},{"comma":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]},"rightBracket":{"type":"reduce","production":["PATH",["nodeNameVariable","PATH"]]}},{"variableName":{"type":"shift","state":34},"true":{"type":"shift","state":38},"false":{"type":"shift","state":39},"null":{"type":"shift","state":40},"string":{"type":"shift","state":41},"number":{"type":"shift","state":42},"nodeName":{"type":"shift","state":36},"nodeNameVariable":{"type":"shift","state":37}},{"$":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"semicolon":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","rightBracket"]]}},{"rightBracket":{"type":"shift","state":59}},{"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION_LIST",["QUERY_EXPRESSION","comma","QUERY_EXPRESSION_LIST"]]}},{"comma":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]},"rightBracket":{"type":"reduce","production":["QUERY_EXPRESSION",["variableName","leftBracket","QUERY_EXPRESSION_LIST","rightBracket"]]}}]}

/***/ }),

/***/ "./node_modules/tree-script/src/const.js":
/*!***********************************************!*\
  !*** ./node_modules/tree-script/src/const.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    P_PROGRAM: 'PROGRAM := EXPRESSION_LIST',

    P_EXPRESSION_LIST_0: 'EXPRESSION_LIST := EXPRESSION',
    P_EXPRESSION_LIST_1: 'EXPRESSION_LIST := EXPRESSION semicolon EXPRESSION_LIST',

    P_EXPRESSION_0: 'EXPRESSION := QUERY_EXPRESSION',
    P_EXPRESSION_1: 'EXPRESSION := UPDATE_EXPRESSION',
    P_EXPRESSION_2: 'EXPRESSION := ',

    P_UPDATE_EXPRESSION_0: 'UPDATE_EXPRESSION := PATH assign QUERY_EXPRESSION',
    P_UPDATE_EXPRESSION_1: 'UPDATE_EXPRESSION := delete PATH',
    P_UPDATE_EXPRESSION_2: 'UPDATE_EXPRESSION := append PATH assign QUERY_EXPRESSION',

    P_QUERY_EXPRESSION_0: 'QUERY_EXPRESSION := ATOM_DATA',
    P_QUERY_EXPRESSION_1: 'QUERY_EXPRESSION := variableName',
    P_QUERY_EXPRESSION_2: 'QUERY_EXPRESSION := PATH',
    P_QUERY_EXPRESSION_3: 'QUERY_EXPRESSION := variableName leftBracket rightBracket',
    P_QUERY_EXPRESSION_4: 'QUERY_EXPRESSION := variableName leftBracket QUERY_EXPRESSION_LIST rightBracket',

    P_QUERY_EXPRESSION_LIST_0: 'QUERY_EXPRESSION_LIST := QUERY_EXPRESSION',
    P_QUERY_EXPRESSION_LIST_1: 'QUERY_EXPRESSION_LIST := QUERY_EXPRESSION comma QUERY_EXPRESSION_LIST',

    P_PATH_0: 'PATH := nodeName',
    P_PATH_1: 'PATH := nodeName PATH',
    P_PATH_2: 'PATH := nodeNameVariable',
    P_PATH_3: 'PATH := nodeNameVariable PATH',

    P_ATOM_DATA_0: 'ATOM_DATA := true',
    P_ATOM_DATA_1: 'ATOM_DATA := false',
    P_ATOM_DATA_2: 'ATOM_DATA := null',
    P_ATOM_DATA_3: 'ATOM_DATA := string',
    P_ATOM_DATA_4: 'ATOM_DATA := number',

    T_ATOM: 'atom',
    T_PATH: 'path',
    T_FUNCTION: 'function',
    T_VARIABLE_NAME: 'variableName',
    T_ASSIGN: 'assign',
    T_DELETE: 'delete',
    T_APPEND: 'append',
    T_NODE_NAME: 'nodeName',
    T_NODE_NAME_VARIABLE: 'nodeNameVariable',

    A_DEFAULT: 'default'
};


/***/ }),

/***/ "./node_modules/tree-script/src/index.js":
/*!***********************************************!*\
  !*** ./node_modules/tree-script/src/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let parser = __webpack_require__(/*! ./parser */ "./node_modules/tree-script/src/parser.js");
let {
    checkAST,
    runTimeCheck,
    getVariable
} = __webpack_require__(/*! ./stub */ "./node_modules/tree-script/src/stub.js");

let {
    T_ATOM,
    T_PATH,
    T_ASSIGN,
    T_DELETE,
    T_APPEND,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_NODE_NAME,
    T_NODE_NAME_VARIABLE
} = __webpack_require__(/*! ./const */ "./node_modules/tree-script/src/const.js");

let executeAST = (ast, {
    queryByPath,
    setByPath,
    removeByPath,
    appendByPath,
    variableMap = {},
    variableStub = {},
    skipCheck = false
}) => {
    // TODO check params
    // check variableStub

    if (!skipCheck) {
        runTimeCheck(variableStub, variableMap);
    }

    let open = [];
    for (let i = 0; i < ast.length; i++) {
        open.unshift({
            node: ast[i],
            visited: false
        });
    }

    let valueStack = [];

    while (open.length) {
        let top = open[open.length - 1];
        let topNode = top.node;
        if (topNode.type === T_ATOM) {
            valueStack.push(topNode.value);
            open.pop();
        } else if (topNode.type === T_VARIABLE_NAME) { // pickup variable
            let variableName = topNode.value;
            let variableValue = getVariable(variableName, variableMap, variableStub);
            valueStack.push(variableValue);
            open.pop();
        } else if (topNode.type === T_PATH) {
            valueStack.push(queryByPath(resolvePath(topNode.value, variableMap)));
            open.pop();
        } else if (topNode.type === T_FUNCTION) {
            let {
                funName,
                params
            } = topNode.value;

            if (top.visited) {
                // get value from value stack
                let paramValues = [];
                for (let i = 0; i < params.length; i++) {
                    paramValues.push(valueStack.pop());
                }
                valueStack.push(variableMap[funName](...paramValues));
                open.pop();
            } else {
                top.visited = true;
                for (let i = 0; i < params.length; i++) {
                    open.push({
                        node: params[i],
                        visited: false
                    });
                }
            }
        } else if (topNode.type === T_ASSIGN) {
            let {
                path,
                value
            } = topNode.value;

            if (top.visited) {
                let assignValue = valueStack.pop();
                valueStack.push(setByPath(resolvePath(path.value, variableMap), assignValue));
                open.pop();
            } else {
                top.visited = true;
                open.push({
                    node: value,
                    visited: false
                });
            }
        } else if (topNode.type === T_DELETE) {
            let {
                path
            } = topNode.value;

            valueStack.push(removeByPath(resolvePath(path.value, variableMap)));
            open.pop();
        } else if (topNode.type === T_APPEND) {
            let {
                path,
                value
            } = topNode.value;

            if (top.visited) {
                let assignValue = valueStack.pop();
                valueStack.push(appendByPath(resolvePath(path.value, variableMap), assignValue));
                open.pop();
            } else {
                top.visited = true;
                open.push({
                    node: value,
                    visited: false
                });
            }
        }
    }

    return valueStack[valueStack.length - 1];
};

let resolvePath = (path, variableMap) => {
    let ret = [];
    for (let i = 0; i < path.length; i++) {
        let {
            type,
            value
        } = path[i];
        if (type === T_NODE_NAME) {
            ret.push(value);
        } else if (type === T_NODE_NAME_VARIABLE) {
            ret.push(variableMap[value]);
        }
    }

    return ret;
};

let parseStrToAst = (str) => {
    let handleChunk = parser();
    if (str) {
        handleChunk(str);
    }
    return handleChunk(null);
};

module.exports = {
    parser,
    parseStrToAst,
    executeAST,
    checkAST
};


/***/ }),

/***/ "./node_modules/tree-script/src/parser.js":
/*!************************************************!*\
  !*** ./node_modules/tree-script/src/parser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let streamTokenSpliter = __webpack_require__(/*! stream-token-parser */ "./node_modules/stream-token-parser/index.js");
let {
    LR
} = __webpack_require__(/*! syntaxer */ "./node_modules/syntaxer/index.js");
let {
    getProductionId,
    processTokens,
} = __webpack_require__(/*! ./util */ "./node_modules/tree-script/src/util.js");
let tokenTypes = __webpack_require__(/*! ../grammer/tokenTypes */ "./node_modules/tree-script/grammer/tokenTypes.js");
let {
    ACTION,
    GOTO
} = __webpack_require__(/*! ../res/lr1Table */ "./node_modules/tree-script/res/lr1Table.js");

let {
    P_PROGRAM,

    P_EXPRESSION_LIST_0,
    P_EXPRESSION_LIST_1,

    P_EXPRESSION_0,
    P_EXPRESSION_1,
    P_EXPRESSION_2,

    P_UPDATE_EXPRESSION_0,
    P_UPDATE_EXPRESSION_1,
    P_UPDATE_EXPRESSION_2,

    P_QUERY_EXPRESSION_0,
    P_QUERY_EXPRESSION_1,
    P_QUERY_EXPRESSION_2,
    P_QUERY_EXPRESSION_3,
    P_QUERY_EXPRESSION_4,

    P_QUERY_EXPRESSION_LIST_0,
    P_QUERY_EXPRESSION_LIST_1,

    P_PATH_0,
    P_PATH_1,
    P_PATH_2,
    P_PATH_3,

    P_ATOM_DATA_0,
    P_ATOM_DATA_1,
    P_ATOM_DATA_2,
    P_ATOM_DATA_3,
    P_ATOM_DATA_4,

    T_ATOM,
    T_PATH,
    T_ASSIGN,
    T_DELETE,
    T_APPEND,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_NODE_NAME,
    T_NODE_NAME_VARIABLE
} = __webpack_require__(/*! ./const */ "./node_modules/tree-script/src/const.js");

module.exports = () => {
    let tokenSpliter = streamTokenSpliter.parser(tokenTypes);

    // TODO optimization AST
    let lrParse = LR(ACTION, GOTO, {
        // when reduce prodcution, translate at the sametime
        reduceHandler: (production, midNode) => {
            switch (getProductionId(production)) {
                case P_PROGRAM:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_EXPRESSION_LIST_0:
                    midNode.value = midNode.children[0].value === null ? [] : [midNode.children[0].value];
                    break;

                case P_EXPRESSION_LIST_1:
                    midNode.value = (midNode.children[0].value === null ? [] : [midNode.children[0].value]).concat(midNode.children[2].value);
                    break;

                case P_EXPRESSION_0:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_EXPRESSION_1:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_EXPRESSION_2: // empty situation
                    midNode.value = null;
                    break;

                case P_UPDATE_EXPRESSION_0:
                    midNode.value = {
                        type: T_ASSIGN,
                        value: {
                            path: midNode.children[0].value,
                            value: midNode.children[2].value
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_1:
                    midNode.value = {
                        type: T_DELETE,
                        value: {
                            path: midNode.children[1].value,
                        }
                    };
                    break;

                case P_UPDATE_EXPRESSION_2:
                    midNode.value = {
                        type: T_APPEND,
                        value: {
                            path: midNode.children[1].value,
                            value: midNode.children[3].value
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_0:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_QUERY_EXPRESSION_1:
                    midNode.value = {
                        type: T_VARIABLE_NAME,
                        value: midNode.children[0].token.text
                    };
                    break;

                case P_QUERY_EXPRESSION_2:
                    midNode.value = midNode.children[0].value;
                    break;

                case P_QUERY_EXPRESSION_3:
                    midNode.value = {
                        type: T_FUNCTION,
                        value: {
                            funName: midNode.children[0].token.text,
                            params: []
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_4:
                    midNode.value = {
                        type: 'function',
                        value: {
                            funName: midNode.children[0].token.text,
                            params: midNode.children[2].value
                        }
                    };
                    break;

                case P_QUERY_EXPRESSION_LIST_0:
                    midNode.value = [midNode.children[0].value];
                    break;

                case P_QUERY_EXPRESSION_LIST_1:
                    midNode.value = [midNode.children[0].value].concat(midNode.children[2].value);
                    break;

                case P_PATH_0:
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME,
                            value: midNode.children[0].token.text.substring(1)
                        }]
                    };
                    break;

                case P_PATH_1:
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME,
                            value: midNode.children[0].token.text.substring(1)
                        }].concat(midNode.children[1].value.value)
                    };
                    break;

                case P_PATH_2:
                    var nodeNameVarTxt = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME_VARIABLE,
                            value: nodeNameVarTxt.substring(2, nodeNameVarTxt.length - 1).trim()
                        }]
                    };
                    break;

                case P_PATH_3:
                    var nodeNameVarTxt2 = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_PATH,
                        value: [{
                            type: T_NODE_NAME_VARIABLE,
                            value: nodeNameVarTxt2.substring(2, nodeNameVarTxt2.length - 1).trim()
                        }].concat(midNode.children[1].value.value)
                    };
                    break;

                case P_ATOM_DATA_0:
                    midNode.value = {
                        type: T_ATOM,
                        value: true
                    };
                    break;

                case P_ATOM_DATA_1:
                    midNode.value = {
                        type: T_ATOM,
                        value: false
                    };
                    break;

                case P_ATOM_DATA_2:
                    midNode.value = {
                        type: T_ATOM,
                        value: null
                    };
                    break;

                case P_ATOM_DATA_3:
                    var text = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_ATOM,
                        value: JSON.parse(text)
                    };
                    break;

                case P_ATOM_DATA_4:
                    var numText = midNode.children[0].token.text;
                    midNode.value = {
                        type: T_ATOM,
                        value: Number(numText)
                    };
                    break;
            }
        }
    });

    // handle chunk data
    return (chunk) => {
        let str = chunk && chunk.toString();
        let tokens = processTokens(tokenSpliter(str));

        for (let i = 0; i < tokens.length; i++) {
            lrParse(tokens[i]);
        }

        // means finished chunks
        if (chunk === null) {
            let ast = lrParse(null);
            return ast.children[0].value;
        }
    };
};


/***/ }),

/***/ "./node_modules/tree-script/src/stub.js":
/*!**********************************************!*\
  !*** ./node_modules/tree-script/src/stub.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



// TODO reuse pfc-compiler

let {
    isObject,
    isFunction,
    isString
} = __webpack_require__(/*! ./util */ "./node_modules/tree-script/src/util.js");

let {
    T_ASSIGN,
    T_DELETE,
    T_VARIABLE_NAME,
    T_FUNCTION,
    T_PATH,
    T_NODE_NAME_VARIABLE,

    A_DEFAULT
} = __webpack_require__(/*! ./const */ "./node_modules/tree-script/src/const.js");

/**
 *
 * variableStub = {
 *    [variableName]: {
 *       type,
 *       default,  // default value of variable
 *       validate // function used to check dynamic
 *    }
 * }
 *
 *
 * TODO restraints checking
 */

// static check
let checkAST = (ast, {
    variableStub = {}
} = {}) => {
    let open = ast.slice(0);

    while (open.length) {
        let top = open.pop();
        let midType = top.type;

        if (midType === T_VARIABLE_NAME) {
            let varName = top.value;
            // must exist
            if (!variableStub.hasOwnProperty(varName)) {
                throw new Error(`missing variable ${varName} in [${Object.keys(variableStub).join(', ')}]`);
            }
        } else if (midType === T_FUNCTION) { // function
            let {
                funName,
                params
            } = top.value;
            let stub = variableStub[funName];
            if (!isObject(stub) || stub.type !== T_FUNCTION) {
                throw new Error(`missing function ${funName}, please check your variable map. Current variable map has keys [${Object.keys(variableStub).join(', ')}].`);
            }
            // push params
            let paramLen = params.length;
            for (let i = 0; i < paramLen; i++) {
                open.push(params[i]);
            }
        } else if (midType === T_ASSIGN) {
            open.push(top.value.path);
            open.push(top.value.value);
        } else if (midType === T_DELETE) {
            open.push(top.value.path);
        } else if (midType === T_PATH) {
            let path = top.value;
            for (let i = 0; i < path.length; i++) {
                let {
                    type,
                    value
                } = path[i];
                if (type === T_NODE_NAME_VARIABLE) {
                    let stub = variableStub[value];

                    if (!isObject(stub) || stub.type !== T_NODE_NAME_VARIABLE) {
                        throw new Error(`missing type attribute ${T_NODE_NAME_VARIABLE} for ${value}, please check your variable map. Current variable map has keys [${Object.keys(variableStub).join(', ')}].`);
                    }
                }
            }
        }
    }
};

let runTimeCheck = (variableStub, variableMap) => {
    for (let name in variableStub) {
        let stub = variableStub[name];
        // missing check
        if (!variableMap.hasOwnProperty(name) && !stub.hasOwnProperty(A_DEFAULT)) {
            throw new Error(`missing variable ${name} in variableMap whick keys are [${Object.keys(variableMap).join(', ')}].`);
        }

        // type match
        if (stub.type === T_FUNCTION && !isFunction(variableMap[name])) {
            throw new Error(`variable ${name} is not function as expected, please check your variable map. Current variable map has keys [${Object.keys(variableMap).join(', ')}].`);
        }

        if (stub.type === T_NODE_NAME_VARIABLE && !isString(variableMap[name])) {
            throw new Error(`variable ${name} is not string as expected, please check your variable map. Current variable map has keys [${Object.keys(variableMap).join(', ')}].`);
        }
    }
};

let getVariable = (name, variableMap, variableStub) => {
    let stub = variableStub[name] || {};
    let value = null;
    if (variableMap.hasOwnProperty(name)) {
        value = variableMap[name];
    } else {
        // try to using default
        if (!stub.hasOwnProperty(A_DEFAULT)) {
            throw new Error(`missing variable ${name}.`);
        } else {
            value = stub[A_DEFAULT];
        }
    }

    if (isObject(stub) && isFunction(stub.validate)) { // dynamic validation
        stub.validate(value);
    }

    return value;
};

module.exports = {
    checkAST,
    runTimeCheck,
    getVariable
};


/***/ }),

/***/ "./node_modules/tree-script/src/util.js":
/*!**********************************************!*\
  !*** ./node_modules/tree-script/src/util.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

let getProductionId = (production) => {
    return `${production[0]} := ${production[1].join(' ')}`;
};

// ignore whitespace
let processTokens = (rawTokens) => {
    let tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
        let {
            text,
            tokenType
        } = rawTokens[i];

        let name = tokenType.name;

        if (name !== 'whitespace') { // ignore white space
            tokens.push({
                text,
                name
            });
        }
    }

    return tokens;
};

let isObject = v => v && typeof v === 'object';

let isFunction = v => typeof v === 'function';

let isString = v => typeof v === 'string';

module.exports = {
    getProductionId,
    processTokens,
    isObject,
    isFunction,
    isString
};


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })

/******/ });
//# sourceMappingURL=app.js.map