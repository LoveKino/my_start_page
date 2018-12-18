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
/******/ 	var hotCurrentHash = "8b8234b58b641cf68775";
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

/***/ "./lib/consoleParser.js":
/*!******************************!*\
  !*** ./lib/consoleParser.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var parseConsoleText = function parseConsoleText(text, sandbox, env) {
  text = text.trim();
  var command = textToArgs(text);

  var commandName = command[0],
      args = command.slice(1);

  env.printLog('> ' + text);
  if (!sandbox.hasOwnProperty(commandName)) {
    env.printErr('command not find: ' + commandName);
  } else {
    env.ctx.update('props.consoleText.value', '');
    try {
      var _sandbox$commandName;

      var result = (_sandbox$commandName = sandbox[commandName]).fn.apply(_sandbox$commandName, [env].concat(_toConsumableArray(args)));
      env.ctx.update('props.action', result);
    } catch (err) {
      env.printErr('' + err.message);
    }
  }
};

// text to command. [cmdName, ...args]
var textToArgs = function textToArgs(text) {
  var command = [];

  var pre = '';
  var needClose = false,
      needEscape = false;

  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (needEscape) {
      pre += ch;
      needEscape = false;
    } else if (ch === '\\') {
      needEscape = true;
    } else if (ch === '"') {
      if (needClose) {
        // find the close one
        if (pre.length) {
          command.push(pre);
        }
        pre = '';
      }
      needClose = !needClose;
    } else if (!needClose && /\s/.test(ch)) {
      // find a seperator
      if (pre.length) {
        command.push(pre);
      }
      pre = '';
    } else {
      pre += ch;
    }
  }

  if (pre.length) {
    command.push(pre);
  }

  return command;
};

// TODO loging

module.exports = {
  parseConsoleText: parseConsoleText,
  textToArgs: textToArgs
};

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! kabanery-glare */ "./node_modules/kabanery-glare/index.js"),
    glareView = _require.glareView;

var TextField = __webpack_require__(/*! kabanery-glare/src/view/TextField */ "./node_modules/kabanery-glare/src/view/TextField.js");

var _require2 = __webpack_require__(/*! kabanery-glare/src/view/ToolBar */ "./node_modules/kabanery-glare/src/view/ToolBar.js"),
    ToolBar = _require2.ToolBar;

var Text = __webpack_require__(/*! kabanery-glare/src/view/Text */ "./node_modules/kabanery-glare/src/view/Text.js");
var Log = __webpack_require__(/*! ./view/Log */ "./lib/view/Log.js");

var _require3 = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js"),
    mount = _require3.mount;

var _require4 = __webpack_require__(/*! ./consoleParser */ "./lib/consoleParser.js"),
    parseConsoleText = _require4.parseConsoleText;

var sandbox = __webpack_require__(/*! ./sandbox */ "./lib/sandbox/index.js")();

var Page = glareView(function (_ref, ctx) {
  var props = _ref.props,
      n = _ref.n,
      bn = _ref.bn;

  var printLog = function printLog(text) {
    props.logs.logs.push(text);
    ctx.update();
  };

  var printErr = function printErr(text) {
    props.logs.logs.push({
      type: 'error',
      text: text
    });
    ctx.update();
  };

  return n('div', {
    style: {
      margin: 0,
      width: '100%',
      height: '100%',
      boxSizing: 'border-box'
    }
  }, [

  // app bar
  n('div', {
    style: {
      position: 'relative',
      zIndex: 1000
    }
  }, [bn(ToolBar, {
    propsPath: 'appTitle'
  }, [])]),

  // console
  props.showConsole ? n('div', {
    style: {
      width: '100%',
      height: '100%',
      padding: '64 8 0 8',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      zIndex: 900,
      left: 0,
      top: 0,
      backgroundColor: 'rgb(255,255,255,0.9)'
    }
  }, [n('form', {
    style: {},
    onsubmit: function onsubmit(e) {
      e.preventDefault();
      // handle logic
      parseConsoleText(props.consoleText.value, sandbox, {
        printLog: printLog,
        printErr: printErr,
        props: props,
        bn: bn,
        ctx: ctx
      });
    }
  }, [n('div', [n(Text, '>'), bn(TextField, {
    propsPath: 'consoleText'
  })])]), n('div', {
    style: {
      flexGrow: '1',
      overflow: 'auto',
      padding: 8
    }
  }, [bn(Log, {
    propsPath: 'logs'
  })])]) : n('span'),

  // action part
  n('div', {
    style: {
      padding: '64 0 0 0',
      height: '100%',
      boxSizing: 'border-box',
      position: 'fixed',
      left: 0,
      top: 0
    }
  }, [

  // render action
  props.action && props.action.actionView ? bn(props.action.actionView, {
    propsPath: 'action.actionData'
  }) : null])]);
}, {
  defaultProps: {}
});

var pageInst = Page({
  props: {
    appTitle: {
      title: 'My Start Page',
      color: 'primary'
    },

    showConsole: true,

    consoleText: {
      value: '',
      placeholder: 'start by typing help',
      style: {
        box: {
          width: 600
        }
      }
    },

    action: null,

    logs: {
      logs: []
    }
  }
});

var actionApis = {
  toggleConsole: function toggleConsole() {
    pageInst.ctx.update('props.showConsole', !pageInst.ctx.getData().props.showConsole);
  }
};

/**
 * keyboard events
 */
document.addEventListener('keypress', function (e) {
  if (e.key === 'a' && e.ctrlKey) {
    actionApis.toggleConsole();
  }
}, true);

mount(pageInst, document.body);

/***/ }),

/***/ "./lib/sandbox/index.js":
/*!******************************!*\
  !*** ./lib/sandbox/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Frame = __webpack_require__(/*! ../view/Frame */ "./lib/view/Frame.js");

var toolsites = [{
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
  name: 'scala api',
  url: 'https://www.scala-lang.org/files/archive/api/current/'
}, {
  name: 'nodejs doc',
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
}, {
  name: 'leetcode',
  url: 'https://leetcode.com/problemset/all/'
}];

module.exports = function () {
  var sandbox = {
    'toolsites': {
      helpText: 'fast forward to shortcuts of some web sites',
      fn: function fn(env, index) {
        if (index === 'list') {
          env.printLog(toolsites.map(function (_ref, index) {
            var name = _ref.name,
                url = _ref.url;

            return index + '.' + name + ': ' + url;
          }).join('\n'));
        } else {
          return {
            actionView: Frame,
            actionData: {
              url: toolsites[index].url
            }
          };
        }
      }
    },

    'js': {
      helpText: 'run js code on this page',
      fn: function fn(env) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        env.printLog(eval(args.join(' ')) + '');
      }
    },

    'url': {
      helpText: 'navigate to a page',
      fn: function fn(env, url) {
        return {
          actionView: Frame,
          actionData: {
            url: url
          }
        };
      }
    },

    'gdict': {
      helpText: 'google dictionary',
      fn: function fn(env, word) {
        return {
          actionView: Frame,
          actionData: {
            url: 'https://translate.google.com/#view=home&op=translate&sl=auto&tl=en&text=' + encodeURI(word)
          }
        };
      }
    },

    'help': {
      helpText: 'show usages of all commands',
      fn: function fn(env, name) {
        var texts = [];
        for (var command in sandbox) {
          if (name === command || !name) {
            texts.push(command + ': ' + sandbox[command].helpText);
          }
        }

        env.printLog(texts.join('\n'));
      }
    }
  };

  return sandbox;
};

/***/ }),

/***/ "./lib/view/Frame.js":
/*!***************************!*\
  !*** ./lib/view/Frame.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! kabanery-glare */ "./node_modules/kabanery-glare/index.js"),
    glareView = _require.glareView;

module.exports = glareView(function (_ref) {
  var props = _ref.props,
      n = _ref.n;

  return n('iframe', {
    src: props.url,
    allow: props.allow,
    style: props.style
  });
}, {
  defaultProps: {
    url: '',
    allow: 'encrypted-media;camera;microphone;fullscreen;',
    style: {
      margin: 0,
      padding: 0,
      border: '1px solid #999999',
      width: '100%',
      height: '100%'
    }
  }
});

/***/ }),

/***/ "./lib/view/Log.js":
/*!*************************!*\
  !*** ./lib/view/Log.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(/*! kabanery-glare */ "./node_modules/kabanery-glare/index.js"),
    glareView = _require.glareView;

module.exports = glareView(function (_ref) {
  var props = _ref.props,
      n = _ref.n;

  return n('ul', {
    style: props.style.box
  }, props.logs.map(function (log) {
    if (typeof log === 'string') {
      return n('pre', {
        style: props.style.item
      }, [log]);
    } else if (log && log.type === 'error') {
      return n('pre', {
        style: props.style.errorItem
      }, [log.text]);
    }
  }));
}, {
  defaultProps: {
    logs: [],
    style: {
      box: {
        margin: 0,
        padding: 8,
        'list-style-type': 'none'
      },
      item: {
        margin: 0,
        padding: 0
      },
      errorItem: {
        margin: 0,
        padding: 0,
        color: 'red'
      }
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

/***/ "./node_modules/bolzano/index.js":
/*!***************************************!*\
  !*** ./node_modules/bolzano/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let {
    isObject, funType, or, isString, isFalsy, likeArray
} = __webpack_require__(/*! basetype */ "./node_modules/basetype/index.js");

let iterate = __webpack_require__(/*! ./lib/iterate */ "./node_modules/bolzano/lib/iterate.js");

let {
    map, reduce, find, findIndex, forEach, filter, any, exist, compact
} = __webpack_require__(/*! ./lib/fp */ "./node_modules/bolzano/lib/fp.js");

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

/***/ "./node_modules/bolzano/lib/fp.js":
/*!****************************************!*\
  !*** ./node_modules/bolzano/lib/fp.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let iterate = __webpack_require__(/*! ./iterate */ "./node_modules/bolzano/lib/iterate.js");

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

/***/ "./node_modules/bolzano/lib/iterate.js":
/*!*********************************************!*\
  !*** ./node_modules/bolzano/lib/iterate.js ***!
  \*********************************************/
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

/***/ "./node_modules/kabanery-glare/index.js":
/*!**********************************************!*\
  !*** ./node_modules/kabanery-glare/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src */ "./node_modules/kabanery-glare/src/index.js");


/***/ }),

/***/ "./node_modules/kabanery-glare/src/index.js":
/*!**************************************************!*\
  !*** ./node_modules/kabanery-glare/src/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const glareView = __webpack_require__(/*! ./util/glareView */ "./node_modules/kabanery-glare/src/util/glareView.js");

module.exports = {
  glareView
};


/***/ }),

/***/ "./node_modules/kabanery-glare/src/theme/base.js":
/*!*******************************************************!*\
  !*** ./node_modules/kabanery-glare/src/theme/base.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * define the default style for kabanery-glare
 */

const {
  mergeDeep
} = __webpack_require__(/*! ../util/util */ "./node_modules/kabanery-glare/src/util/util.js");

module.exports = (basics = {
  box: {
    margin: 0
  },

  font: {
    size: {
      normal: '1rem',
      small: '0.75rem'
    },
    color: {
      placeholder: 'rgba(0, 0, 0, 0.54)',
      normal: 'rgba(0, 0, 0, 0.87)'
    }
  },

  line: {
    color: {
      normal: 'rgba(0, 0, 0, 0.42)',
      hover: 'rgb(31,31,31)',
      light: '#1976d2'
    }
  }
}) => {
  const btnBase = {
    normal: {
      border: 0,
      margin: basics.box.margin,
      boxSizing: 'border-box',
      padding: '8px 16px',
      minWidth: 64,
      minHeight: 36,
      fontSize: '0.875rem',
      cursor: 'pointer',
      letterSpacing: '0.02857em',
      fontWeight: '500',
      borderRadius: 4,
      textTransform: 'uppercase',
      lineHeight: '1.5',
      outline: 0
    },

    hover: {
      border: 0,
      margin: basics.box.margin,
      boxSizing: 'border-box',
      padding: '8px 16px',
      minWidth: 64,
      minHeight: 36,
      fontSize: '0.875rem',
      cursor: 'pointer',
      letterSpacing: '0.02857em',
      fontWeight: '500',
      borderRadius: 4,
      textTransform: 'uppercase',
      lineHeight: '1.5',
      textDecoration: 'none',
      outline: 0
    },

    active: {
      border: 0,
      margin: basics.box.margin,
      boxSizing: 'border-box',
      padding: '8px 16px',
      minWidth: 64,
      minHeight: 36,
      fontSize: '0.875rem',
      cursor: 'pointer',
      letterSpacing: '0.02857em',
      fontWeight: '500',
      borderRadius: 4,
      textTransform: 'uppercase',
      lineHeight: '1.5',
      textDecoration: 'none',
      outline: 0
    }
  };

  const badgeBase = {
    width: 22,
    height: 22,
    top: -11,
    right: -11,
    display: 'flex',
    zIndex: 1,
    position: 'absolute',
    flexWrap: 'wrap',
    fontSize: '0.75rem',
    alignItems: 'center',
    borderRadius: '50%',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  };

  const checkboxBase = {
    margin: '0 12px 0 0',
    padding: 0,
    width: 18,
    height: '100%',
    borderRadius: 2,
    position: 'relative',
    boxSizing: 'border-box'
  };

  return {
    TextField: {
      box: {
        display: 'inline-flex',
        position: 'relative',
        width: 200,
        height: 48,
        cursor: 'text',
        margin: basics.box.margin,
        padding: 0,
        boxSizing: 'border-box'
      },

      placeholder: {
        place: {
          position: 'absolute',
          left: 0,
          fontSize: basics.font.size.normal,
          color: basics.font.color.placeholder,
          cursor: 'text',
          transform: 'translate(0, 24px) scale(1)',
          transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
        },

        active: {
          position: 'absolute',
          top: 0,
          left: 0,
          fontSize: basics.font.size.normal,
          color: basics.line.color.light,
          transform: 'translate(0, 1.5px) scale(0.75)',
          transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
        },

        placeContent: {
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(0, 1.5px) scale(0.75)',
          fontSize: basics.font.size.normal,
          color: basics.font.color.placeholder,
          cursor: 'text'
        }
      },

      input: {
        width: '100%',
        height: 30,
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 0,
        padding: '0 6px 0 6px',
        border: 'none',
        borderBottom: `1px solid ${basics.line.color.normal}`,
        fontSize: basics.font.size.normal,
        outline: 'none',
        boxSizing: 'border-box'
      },

      hover: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottom: `2px solid ${basics.line.color.hover}`,
      },

      focus: {
        active: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottom: `2px solid ${basics.line.color.light}`,
          transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
        },
        unactive: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderBottom: `2px solid ${basics.line.color.light}`,
          transform: 'scaleX(0)',
          transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
        }
      }
    },

    // style for button
    Button: {
      box: {
        text: {
          default: mergeDeep(btnBase, {
            normal: {
              color: basics.font.color.normal,
              backgroundColor: 'transparent'
            },
            hover: {
              color: basics.font.color.normal,
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
            },
            active: {
              color: basics.font.color.normal,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }
          }),

          primary: mergeDeep(btnBase, {
            normal: {
              color: '#2196f3',
              backgroundColor: 'transparent'
            },
            hover: {
              color: '#2196f3',
              backgroundColor: 'rgba(33, 150, 243, 0.08)',
            },
            active: {
              color: '#2196f3',
              backgroundColor: 'rgba(33, 150, 243, 0.3)',
            }
          }),

          secondary: mergeDeep(btnBase, {
            normal: {
              color: 'rgb(225, 0, 80)'
            },
            hover: {
              color: 'rgb(225, 0, 80)',
              backgroundColor: 'rgba(225, 0, 80, 0.08)',
            },
            active: {
              color: 'rgb(225, 0, 80)',
              backgroundColor: 'rgba(225, 0, 80, 0.3)',
            }
          })
        },

        contained: {
          default: mergeDeep(btnBase, {
            normal: {
              border: 0,
              color: basics.font.color.normal,
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#e0e0e0'
            },
            hover: {
              border: 0,
              color: basics.font.color.normal,
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#d5d5d5'
            },
            active: {
              border: 0,
              color: basics.font.color.normal,
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#e0e0e0'
            }
          }),

          primary: mergeDeep(btnBase, {
            normal: {
              border: 0,
              color: '#fff',
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#2196f3'
            },
            hover: {
              border: 0,
              color: '#fff',
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#1976d2'
            },
            active: {
              border: 0,
              color: '#fff',
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: '#2196f3'
            }
          }),

          secondary: mergeDeep(btnBase, {
            normal: {
              border: 0,
              color: '#fff',
              backgroundColor: 'rgb(225, 0, 80)',
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
            },
            hover: {
              border: 0,
              color: '#fff',
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: 'rgb(157, 0, 56)'
            },
            active: {
              border: 0,
              color: '#fff',
              boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
              backgroundColor: 'rgb(225, 0, 80)'
            }
          })
        }
      }
    },

    // divider style
    Divider: {
      height: 1,
      margin: 0,
      padding: 0,
      border: 'none',
      flexShrink: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },

    Badge: {
      box: {
        display: 'inline-flex',
        position: 'relative',
        verticalAlign: 'middle'
      },

      badge: {
        primary: Object.assign({
          color: '#fff',
          backgroundColor: '#2196f3'
        }, badgeBase),
        secondary: Object.assign({
          color: '#fff',
          backgroundColor: 'rgb(225, 0, 80)'
        }, badgeBase)
      }
    },

    // checkbox style
    Checkbox: {
      box: {
        margin: 0,
        padding: 0,
        position: 'relative',
        display: 'inline-flex',
        cursor: 'pointer',
        alignItems: 'center',
        verticalAlign: 'middle',
        height: 18,
        lineHeight: 18
      },
      checkbox: {
        default: {
          unchecked: Object.assign({
            border: '2px solid rgba(0, 0, 0, 0.54)'
          }, checkboxBase),
          checked: Object.assign({
            border: '2px solid rgba(0, 0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.54)'
          }, checkboxBase)
        },
        primary: {
          unchecked: Object.assign({
            border: '2px solid rgba(0, 0, 0, 0.54)'
          }, checkboxBase),
          checked: Object.assign({
            border: '2px solid #2196f3',
            backgroundColor: '#2196f3'
          }, checkboxBase)
        },
        secondary: {
          unchecked: Object.assign({
            border: '2px solid rgba(0, 0, 0, 0.54)'
          }, checkboxBase),
          checked: Object.assign({
            border: '2px solid rgb(225, 0, 80)',
            backgroundColor: 'rgb(225, 0, 80)'
          }, checkboxBase)
        }
      },
      label: {
        color: basics.font.color.normal,
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.5',
        letterSpacing: '0.01071em'
      }
    },

    Text: {
      default: {
        color: basics.font.color.normal,
      },
      h2: {
        color: basics.font.color.normal,
        fontSize: '2.125rem',
        fontWeight: '400',
        lineHeight: '1.17',
        letterSpacing: '0.00735em',
        margin: 0,
        padding: '32px 0 24px',
        display: 'inline-flex'
      }
    },
    Br: {},
    ToolBar: {
      box: {
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        minHeight: 64,
        boxSizing: 'border-box',
        paddingLeft: 24,
        paddingRight: 24,
        display: 'flex',
        alignItems: 'center'
      },
      toolBar: {
        primary: {
          backgroundColor: '#2196f3',
          color: 'white'
        },
        default: {
          backgroundColor: '#f5f5f5',
          color: 'rgba(0, 0, 0, 0.87)'
        }
      },

      title: {
        flexGrow: '1',
        fontSize: '1.25rem',
        fontWeight: '500',
        lineHeight: 1.6,
        letterSpacing: '0.0075em'
      }
    },
    ToolBarLeft: {
      primary: {
        marginRight: 12
      },
      default: {
        marginRight: 12
      }
    },
    ToolBarRight: {
      primary: {
        marginLeft: 12
      },
      default: {
        marginLeft: 12
      }
    }
  };
};


/***/ }),

/***/ "./node_modules/kabanery-glare/src/util/glareView.js":
/*!***********************************************************!*\
  !*** ./node_modules/kabanery-glare/src/util/glareView.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const {
  view,
  parseArgs,
  n
} = __webpack_require__(/*! kabanery */ "./node_modules/kabanery/index.js");
const uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
const {
  get,
  set,
  isObject
} = __webpack_require__(/*! ./util */ "./node_modules/kabanery-glare/src/util/util.js");

const defaultTheme = __webpack_require__(/*! ../theme/base */ "./node_modules/kabanery-glare/src/theme/base.js")();
const noop = () => {};

const copyTo = (obj1, obj2) => {
  for (let name in obj2) {
    if (obj2[name] !== null && obj2[name] !== undefined) {
      if (obj1[name] === null || obj1[name] === undefined) {
        obj1[name] = obj2[name];
      } else {
        if (typeof obj1[name] === 'object' && typeof obj2[name] === 'object') {
          obj1[name] = copyTo(obj1[name], obj2[name]);
        }
      }
    }
  }

  return obj1;
};

module.exports = (render, {
  /**
   * id rule: (1) specify a name, like 'input', 'text'
   *          (2) auto generate an id
   * TODO: avoid repeated name by using global view map
   */
  id = uuidv4(),
  defaultProps
} = {}) => {
  if (typeof render !== 'function') {
    throw new Error(`Expect function for glare view render, but got ${render}`);
  }
  return view((data, ctx) => {
    data.onChange = data.onChange || noop;
    data.onEvent = data.onEvent || noop;
    data.theme = data.theme || defaultTheme;
    /**
     * priority:
     *  props >> defaultProps >> theme
     */
    copyTo(data.props, defaultProps);
    copyTo(data.props, {
      style: data.theme[id]
    });

    data.n = (...args) => {
      const {
        tagName,
        attributes,
        childs
      } = parseArgs(args);
      if (typeof tagName === 'function') { // TODO check is glare view or not
        return tagName({
          props: attributes.props || {},
          onChange: attributes.onChange,
          onEvent: attributes.onEvent,
          theme: attributes.theme, // extend theme to all glare view children
          children: childs
        });
      } else {
        return n(tagName, attributes, childs);
      }
    };

    /**
     * bind props of current view with child view
     *
     * @param propsPath string a json path
     */
    data.bn = (childView, {
      propsPath,
      onChildChange,
      onChildEvent,
      doUpdate = false
    }, children) => {
      // get child props by json path
      // if child props is not exists, set default value
      let childProps = get(data.props, propsPath);
      if (!isObject(childProps)) {
        childProps = {};
        set(data.props, propsPath, childProps);
      }
      return childView({
        props: childProps,
        onChange: (newChildProps, e) => {
          // update parent props
          set(data.props, propsPath, newChildProps);
          if (onChildChange) {
            onChildChange(newChildProps, e);
          }
          if (doUpdate) {
            ctx.update();
          }
          data.onChange(data.props, e);
        },
        onEvent: (e) => {
          if (onChildEvent) {
            onChildEvent(e);
          }
          data.onEvent(e);
        },
        theme: data.theme,
        children
      });
    };

    return render(data, ctx);
  });
};


/***/ }),

/***/ "./node_modules/kabanery-glare/src/util/util.js":
/*!******************************************************!*\
  !*** ./node_modules/kabanery-glare/src/util/util.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * merge two objects
 */
const mergeDeep = (obj1, obj2) => {
  if (obj1 === null || obj1 === undefined) return obj2;
  if (obj2 === null || obj2 === undefined) return obj1;

  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    const newObj = Object.assign({}, obj1); // copy obj1
    for (let key in obj2) {
      newObj[key] = mergeDeep(newObj[key], obj2[key]);
    }
    return newObj;
  }

  return obj2;
};

const isObject = (v) => v && typeof v === 'object';

const set = (sandbox, name = '', value) => {
  name = name.trim();
  const parts = !name ? [] : name.split('.');
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

/**
 * a.b.c
 */
const get = (sandbox, name = '') => {
  name = name.trim();
  let parts = !name ? [] : name.split('.');

  let parent = sandbox;

  for (let i = 0; i < parts.length; i++) {
    if (!isObject(parent)) return undefined;
    const part = parts[i];
    parent = parent[part];
  }

  return parent;
};

module.exports = {
  mergeDeep,
  set,
  get,
  isObject
};


/***/ }),

/***/ "./node_modules/kabanery-glare/src/view/Text.js":
/*!******************************************************!*\
  !*** ./node_modules/kabanery-glare/src/view/Text.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const glareView = __webpack_require__(/*! ../util/glareView */ "./node_modules/kabanery-glare/src/util/glareView.js");

module.exports = glareView(({
  props,
  n,
  children
}) => {
  if (props.type === 'default') {
    return n('span', {
      style: props.style[props.type]
    }, children);
  } else if (props.type === 'h2') {
    return n('h2', {
      style: props.style[props.type]
    }, children);
  } else {
    throw new Error(`unexpect Text type ${props.type}`);
  }
}, {
  id: 'Text',
  defaultProps: {
    type: 'default'
  }
});


/***/ }),

/***/ "./node_modules/kabanery-glare/src/view/TextField.js":
/*!***********************************************************!*\
  !*** ./node_modules/kabanery-glare/src/view/TextField.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const glareView = __webpack_require__(/*! ../util/glareView */ "./node_modules/kabanery-glare/src/util/glareView.js");

module.exports = glareView(({
  props,
  onChange,
  onEvent,
  n
}, ctx) => {
  return n('div', {
    style: props.style.box,

    onclick: (e) => {
      onEvent({
        type: 'click',
        sourceEvent: e
      });
      ctx.update('props.activeStatus', 'focused');
    },

    onfocusin: (e) => {
      onEvent({
        type: 'focusin',
        sourceEvent: e
      });
      ctx.update('props.activeStatus', 'focused');
    },

    onfocusout: (e) => {
      onEvent({
        type: 'focusout',
        sourceEvent: e
      });
      ctx.update('props.activeStatus', 'unfocused');
    },

    onmouseover: (e) => {
      onEvent({
        type: 'mouseover',
        sourceEvent: e
      });
      if (props.activeStatus === 'unfocused') {
        ctx.update('props.activeStatus', 'hover');
      }
    },

    onmouseout: (e) => {
      onEvent({
        type: 'mouseout',
        sourceEvent: e
      });
      if (props.activeStatus === 'hover') {
        ctx.update('props.activeStatus', 'unfocused');
      }
    }
  }, [
    // input box
    n('input', {
      style: props.style.input,
      value: props.value,
      type: props.type,
      // TODO other events
      oninput: (e) => {
        if (e.target.value !== props.value) {
          props.value = e.target.value;
          onChange(props, ctx, e); // onChange should always report the change
        }

        onEvent({
          type: 'input',
          sourceEvent: e
        });
      }
    }),

    n('label', {
      style: props.activeStatus === 'focused' ? props.style.placeholder.active : props.value !== '' ? props.style.placeholder.placeContent : props.style.placeholder.place
    }, `${props.placeholder}`),

    // hover line
    n('div', {
      style: props.activeStatus === 'hover' ? props.style.hover : ''
    }),

    // focus line
    n('div', {
      style: props.activeStatus === 'focused' ? props.style.focus.active : props.style.focus.unactive
    })
  ]);
}, {
  id: 'TextField',
  defaultProps: {
    placeholder: '',
    value: '',
    type: 'text',
    activeStatus: 'unfocused'
  }
});


/***/ }),

/***/ "./node_modules/kabanery-glare/src/view/ToolBar.js":
/*!*********************************************************!*\
  !*** ./node_modules/kabanery-glare/src/view/ToolBar.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const glareView = __webpack_require__(/*! ../util/glareView */ "./node_modules/kabanery-glare/src/util/glareView.js");

/**
 * tool bar
 */
const ToolBar = glareView(({
  props,
  n,
  children
}) => {
  return n('div', {
    style: Object.assign({}, props.style.box, props.style.toolBar[props.color])
  }, [
    children[0],
    n('span', {
      style: props.style.title
    }, props.title),
    children[1]
  ]);
}, {
  id: 'ToolBar',
  defaultProps: {
    color: 'default',
    title: ''
  }
});

const ToolBarLeft = glareView(({
  props,
  n,
  children
}) => {
  return n('span', {
    style: props.style[props.color]
  }, children);
}, {
  id: 'ToolBarLeft',
  defaultProps: {
    color: 'default'
  }
});

const ToolBarRight = glareView(({
  props,
  n,
  children
}) => {
  return n('span', {
    style: props.style[props.color]
  }, children);
}, {
  id: 'ToolBarRight',
  defaultProps: {
    color: 'default'
  }
});

module.exports = {
  ToolBar,
  ToolBarLeft,
  ToolBarRight
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
} = __webpack_require__(/*! bolzano */ "./node_modules/bolzano/index.js");

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
  isNode
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");

const parseArgs = __webpack_require__(/*! ./parseArgs */ "./node_modules/kabanery/src/n/parseArgs.js");

const parseStyle = __webpack_require__(/*! ./parseStyle */ "./node_modules/kabanery/src/n/parseStyle.js");

const KABANERY_NODE = 'kabanery_node';

const isKabaneryNode = (v) => isObject(v) && v.type === KABANERY_NODE;

/**
 * elementType: html, svg
 */
const knodeCreator = (elementType) => {
  return (...args) => {
    return createKabaneryNode(elementType, args);
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
const splitAttribues = (attributes) => {
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
} = __webpack_require__(/*! bolzano */ "./node_modules/bolzano/index.js");

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

const {
  isNode,
  createElement,
  createSvgElement
} = __webpack_require__(/*! ../util */ "./node_modules/kabanery/src/util/index.js");
const {
  isKabaneryNode
} = __webpack_require__(/*! ../n */ "./node_modules/kabanery/src/n/index.js");
const {
  bindEvents,
  attachDocument
} = __webpack_require__(/*! ../event */ "./node_modules/kabanery/src/event/index.js");
const {
  flat,
  forEach,
  map
} = __webpack_require__(/*! bolzano */ "./node_modules/bolzano/index.js");

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
  } else {
    return node + '';
  }
};

/**
 * @param parentNode
 *      the dom node used hook node we rendered
 */
const mount = (kabaneryRoots, parentNode) => {
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

const toDomNode = (kNode) => {
  if (isKabaneryNode(kNode)) {
    let nativeNode = null;
    if (kNode.elementType === 'html') {
      nativeNode = createElement(kNode.tagName, kNode.attrMap, map(kNode.childNodes, toDomNode));
    } else { // svg
      nativeNode = createSvgElement(kNode.tagName, kNode.attrMap, map(kNode.childNodes, toDomNode));
    }

    if (kNode.ctx) {
      kNode.ctx.bindNativeNode(nativeNode);
    }

    bindEvents(nativeNode, kNode.eventMap);
    return nativeNode;
  } else if (isNode(kNode)) {
    return kNode;
  } else {
    return document.createTextNode(kNode.toString());
  }
};

const getDoc = (node) => {
  while (node.parentNode) {
    node = node.parentNode;
  }
  return node;
};

module.exports = {
  toDomNode,
  toHTML,
  mount
};


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
  emptyChildren,
  getTagName,
  getAttrMap,
  getTextAreaTextContent,
  getAttributeValue

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
const {
  mount
} = __webpack_require__(/*! ../resolver */ "./node_modules/kabanery/src/resolver/index.js");

const ViewContext = function(render, obj) {
  this.nativeNode = null; // record corresponding native node
  this.data = obj;
  this.render = render;
  this.kNode = null; // cache old kabanery node
};

ViewContext.prototype = {
  construct: ViewContext,

  update: function(...args) {
    updateData(this.data, args);
    return this.renderNativeView();
  },

  // for some special situation, like log view
  // TODO prepend?
  appendView: function(itemView) {
    if (this.nativeNode) {
      mount(itemView, this.nativeNode);
    }
  },

  /**
   * render view according to current data
   *
   * do the diff to reduce dom operations
   */
  renderNativeView: function() {
    const newKNode = this.getKabaneryNode();
    this.nativeNode = replace(this.nativeNode, newKNode, this.kNode);
    // update KNode to latest
    this.kNode = newKNode;
    return this.nativeNode;
  },

  /**
   * run render function and get the tree based on n function
   */
  renderKabaneryNode: function() {
    this.kNode = this.getKabaneryNode();
    return this.kNode;
  },

  getKabaneryNode: function() {
    const kNode = this.render(this.data, this.getContext());

    if (isFunction(kNode)) { // closure
      this.render = kNode;
      return this.getKabaneryNode(this.data, this.getContext());
    } else {
      kNode.ctx = this.getContext(); // hook the content
      return kNode;
    }
  },

  getKNode: function() {
    return this.kNode;
  },

  getNativeNode: function() {
    return this.nativeNode;
  },

  getData: function() {
    return this.data;
  },

  getContext: function() {
    return this._ctx;
  },

  bindNativeNode: function(node) {
    this.nativeNode = node;
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
  /**
   * create a view class
   */
  view: (viewFun) => {
    /**
     * create a view instance
     *
     * (data) -> nativeNode
     */
    return (obj) => {
      // create context
      const ctx = getViewContext(viewFun, obj);
      // render node
      const kNode = ctx.renderKabaneryNode();

      return kNode;
    };
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


const {
  toDomNode
} = __webpack_require__(/*! ../../resolver */ "./node_modules/kabanery/src/resolver/index.js");
const {
  removeNode,
  getTagName,
  getTextAreaTextContent,
  getAttributeValue,
  getAttrMap,
  hasOwnProperty
} = __webpack_require__(/*! ../../util */ "./node_modules/kabanery/src/util/index.js");
const {
  eventMapHook
} = __webpack_require__(/*! ../../const */ "./node_modules/kabanery/src/const/index.js");
const {
  isKabaneryNode
} = __webpack_require__(/*! ../../n */ "./node_modules/kabanery/src/n/index.js");

const editAttributes = (node, newKNode, oldKNode) => {
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

  diffList(newKNode.childNodes, oldKNode.childNodes, node);
};

// TODO using key
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
  if (isKabaneryNode(newKNode) && isKabaneryNode(oldKNode)) {
    if (getTagName(oldKNode) !== getTagName(newKNode)) {
      return replaceDirectly(node, newKNode);
    } else {
      editNode(node, newKNode, oldKNode);
      // binding native node
      if (newKNode.ctx) {
        newKNode.ctx.bindNativeNode(node);
      }
      return node;
    }
  } else {
    return replaceDirectly(node, newKNode);
  }
};

/**
 * replace old node with new node
 */
const replaceDirectly = (node, newKNode) => {
  const parent = node.parentNode;
  const newNode = toDomNode(newKNode);
  // replace
  parent.replaceChild(newNode, node);
  return newNode;
};

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


/***/ })

/******/ });
//# sourceMappingURL=app.js.map