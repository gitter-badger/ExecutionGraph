#!/bin/bash

set -e # exit on error

# "DEPENDECIES ========================================================================"

export INSTALL_PREFIX="/usr/local/"
export PATH=$INSTALL_PREFIX/bin:$PATH

cd $ROOT_PATH

wget --no-check-certificate http://www.cmake.org/files/v3.10/cmake-3.10.2-Linux-x86_64.sh
chmod a+x cmake-3.10.2-Linux-x86_64.sh
sudo ./cmake-3.10.2-Linux-x86_64.sh --skip-license --prefix=$INSTALL_PREFIX

if [ -n "${GCC_VERSION}" ]; then export CXX="g++-${GCC_VERSION}" CC="gcc-${GCC_VERSION}"; fi
if [ -n "${CLANG_VERSION}" ]; then export CXX="clang++-${CLANG_VERSION}" CC="clang-${CLANG_VERSION}"; fi

echo "Path set to ${PATH}"
echo "CXX set to ${CXX}"
echo "CC set to ${CC}"

${CXX} --version
cmake --version

chmod +x $CHECKOUT_PATH/travis/install_dep.sh
# run the command in this process -> env varibales!
. $CHECKOUT_PATH/travis/install_dep.sh
# "DEPENDECIES COMPLETE ================================================================="

set +e