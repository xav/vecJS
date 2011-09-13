SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

COMPILER = java -jar ${BUILD_DIR}/compiler.jar --js

BASE_FILES = ${SRC_DIR}/vec.js\
	${SRC_DIR}/v3.js\
	${SRC_DIR}/v4.js\
	${SRC_DIR}/m34.js

MODULES = ${SRC_DIR}/intro.js\
	${BASE_FILES}\
	${SRC_DIR}/outro.js


VJS = ${DIST_DIR}/vec.js
VJS_MIN = ${DIST_DIR}/vec.min.js

VJS_VER = $(shell cat version.txt)

VJS_VER = $(shell cat version.txt)
VER = sed "s/@VERSION/${VJS_VER}/"

DATE=$(shell git log -1 --pretty=format:%ad)

all: core

core: vjs min
	@@echo "vecJS build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

vjs: ${VJS}

${VJS}: ${MODULES} | ${DIST_DIR}
	@@echo "Building" ${VJS}

	@@cat ${MODULES} | \
		sed 's/@DATE/'"${DATE}"'/' | \
		sed '/@license/,/\*\// d' | \
		${VER} > ${VJS};

min: vjs ${VJS_MIN}

${VJS_MIN}: ${VJS}
	@@echo "Minifying vecJS" ${VJS_MIN}; \
	${COMPILER} ${VJS} > ${VJS_MIN}; \


clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
