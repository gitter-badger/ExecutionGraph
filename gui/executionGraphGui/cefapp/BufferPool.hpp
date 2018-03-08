// =========================================================================================
//  ExecutionGraph
//  Copyright (C) 2014 by Gabriel Nützi <gnuetzi (at) gmail (døt) com>
//
//  @date Sun Feb 25 2018
//  @author Gabriel Nützi, gnuetzi (at) gmail (døt) com
//
//  This Source Code Form is subject to the terms of the Mozilla Public
//  License, v. 2.0. If a copy of the MPL was not distributed with this
//  file, You can obtain one at http://mozilla.org/MPL/2.0/.
// =========================================================================================

#ifndef cefapp_BufferPool_h
#define cefapp_BufferPool_h

#include <foonathan/memory/heap_allocator.hpp>

/* ---------------------------------------------------------------------------------------*/
/*!
    A thread-safe memory allocator which is used for `BinaryBuffer` instances.

    @date Thu Mar 08 2018
    @author Gabriel Nützi, gnuetzi (at) gmail (døt) com
 */
/* ---------------------------------------------------------------------------------------*/
class BufferPool : public foonathan::memory::heap_allocator
{
public:
    BufferPool()          = default;
    virtual ~BufferPool() = default;
};

#endif
