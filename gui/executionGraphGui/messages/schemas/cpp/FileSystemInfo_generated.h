// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_FILESYSTEMINFO_EXECUTIONGRAPHGUI_SERIALIZATION_H_
#define FLATBUFFERS_GENERATED_FILESYSTEMINFO_EXECUTIONGRAPHGUI_SERIALIZATION_H_

#include "flatbuffers/flatbuffers.h"

namespace executionGraphGui {
namespace serialization {

struct Date;

struct PathInfo;

enum Permissions {
  Permissions_None = 0,
  Permissions_OwnerRead = 1,
  Permissions_OwnerWrite = 2,
  Permissions_OwnerReadWrite = 3,
  Permissions_MIN = Permissions_None,
  Permissions_MAX = Permissions_OwnerReadWrite
};

inline const Permissions (&EnumValuesPermissions())[4] {
  static const Permissions values[] = {
    Permissions_None,
    Permissions_OwnerRead,
    Permissions_OwnerWrite,
    Permissions_OwnerReadWrite
  };
  return values;
}

inline const char * const *EnumNamesPermissions() {
  static const char * const names[] = {
    "None",
    "OwnerRead",
    "OwnerWrite",
    "OwnerReadWrite",
    nullptr
  };
  return names;
}

inline const char *EnumNamePermissions(Permissions e) {
  if (e < Permissions_None || e > Permissions_OwnerReadWrite) return "";
  const size_t index = static_cast<int>(e);
  return EnumNamesPermissions()[index];
}

FLATBUFFERS_MANUALLY_ALIGNED_STRUCT(2) Date FLATBUFFERS_FINAL_CLASS {
 private:
  uint8_t sec_;
  uint8_t min_;
  uint8_t hour_;
  uint8_t day_;
  uint8_t month_;
  int8_t padding0__;
  uint16_t year_;
  uint8_t wday_;
  int8_t padding1__;
  uint16_t yday_;

 public:
  Date() {
    memset(this, 0, sizeof(Date));
  }
  Date(uint8_t _sec, uint8_t _min, uint8_t _hour, uint8_t _day, uint8_t _month, uint16_t _year, uint8_t _wday, uint16_t _yday)
      : sec_(flatbuffers::EndianScalar(_sec)),
        min_(flatbuffers::EndianScalar(_min)),
        hour_(flatbuffers::EndianScalar(_hour)),
        day_(flatbuffers::EndianScalar(_day)),
        month_(flatbuffers::EndianScalar(_month)),
        padding0__(0),
        year_(flatbuffers::EndianScalar(_year)),
        wday_(flatbuffers::EndianScalar(_wday)),
        padding1__(0),
        yday_(flatbuffers::EndianScalar(_yday)) {
    (void)padding0__;
    (void)padding1__;
  }
  uint8_t sec() const {
    return flatbuffers::EndianScalar(sec_);
  }
  uint8_t min() const {
    return flatbuffers::EndianScalar(min_);
  }
  uint8_t hour() const {
    return flatbuffers::EndianScalar(hour_);
  }
  uint8_t day() const {
    return flatbuffers::EndianScalar(day_);
  }
  uint8_t month() const {
    return flatbuffers::EndianScalar(month_);
  }
  uint16_t year() const {
    return flatbuffers::EndianScalar(year_);
  }
  uint8_t wday() const {
    return flatbuffers::EndianScalar(wday_);
  }
  uint16_t yday() const {
    return flatbuffers::EndianScalar(yday_);
  }
};
FLATBUFFERS_STRUCT_END(Date, 12);

struct PathInfo FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_PATH = 4,
    VT_NAME = 6,
    VT_PERMISSIONS = 8,
    VT_SIZE = 10,
    VT_MODIFIED = 12,
    VT_ISFILE = 14,
    VT_FILES = 16,
    VT_DIRECTORIES = 18
  };
  const flatbuffers::String *path() const {
    return GetPointer<const flatbuffers::String *>(VT_PATH);
  }
  const flatbuffers::String *name() const {
    return GetPointer<const flatbuffers::String *>(VT_NAME);
  }
  Permissions permissions() const {
    return static_cast<Permissions>(GetField<int8_t>(VT_PERMISSIONS, 0));
  }
  uint64_t size() const {
    return GetField<uint64_t>(VT_SIZE, 0);
  }
  const Date *modified() const {
    return GetStruct<const Date *>(VT_MODIFIED);
  }
  bool isFile() const {
    return GetField<uint8_t>(VT_ISFILE, 0) != 0;
  }
  const flatbuffers::Vector<flatbuffers::Offset<PathInfo>> *files() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<PathInfo>> *>(VT_FILES);
  }
  const flatbuffers::Vector<flatbuffers::Offset<PathInfo>> *directories() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<PathInfo>> *>(VT_DIRECTORIES);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffsetRequired(verifier, VT_PATH) &&
           verifier.VerifyString(path()) &&
           VerifyOffsetRequired(verifier, VT_NAME) &&
           verifier.VerifyString(name()) &&
           VerifyField<int8_t>(verifier, VT_PERMISSIONS) &&
           VerifyField<uint64_t>(verifier, VT_SIZE) &&
           VerifyFieldRequired<Date>(verifier, VT_MODIFIED) &&
           VerifyField<uint8_t>(verifier, VT_ISFILE) &&
           VerifyOffset(verifier, VT_FILES) &&
           verifier.VerifyVector(files()) &&
           verifier.VerifyVectorOfTables(files()) &&
           VerifyOffset(verifier, VT_DIRECTORIES) &&
           verifier.VerifyVector(directories()) &&
           verifier.VerifyVectorOfTables(directories()) &&
           verifier.EndTable();
  }
};

struct PathInfoBuilder {
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_path(flatbuffers::Offset<flatbuffers::String> path) {
    fbb_.AddOffset(PathInfo::VT_PATH, path);
  }
  void add_name(flatbuffers::Offset<flatbuffers::String> name) {
    fbb_.AddOffset(PathInfo::VT_NAME, name);
  }
  void add_permissions(Permissions permissions) {
    fbb_.AddElement<int8_t>(PathInfo::VT_PERMISSIONS, static_cast<int8_t>(permissions), 0);
  }
  void add_size(uint64_t size) {
    fbb_.AddElement<uint64_t>(PathInfo::VT_SIZE, size, 0);
  }
  void add_modified(const Date *modified) {
    fbb_.AddStruct(PathInfo::VT_MODIFIED, modified);
  }
  void add_isFile(bool isFile) {
    fbb_.AddElement<uint8_t>(PathInfo::VT_ISFILE, static_cast<uint8_t>(isFile), 0);
  }
  void add_files(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<PathInfo>>> files) {
    fbb_.AddOffset(PathInfo::VT_FILES, files);
  }
  void add_directories(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<PathInfo>>> directories) {
    fbb_.AddOffset(PathInfo::VT_DIRECTORIES, directories);
  }
  explicit PathInfoBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  PathInfoBuilder &operator=(const PathInfoBuilder &);
  flatbuffers::Offset<PathInfo> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<PathInfo>(end);
    fbb_.Required(o, PathInfo::VT_PATH);
    fbb_.Required(o, PathInfo::VT_NAME);
    fbb_.Required(o, PathInfo::VT_MODIFIED);
    return o;
  }
};

inline flatbuffers::Offset<PathInfo> CreatePathInfo(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::String> path = 0,
    flatbuffers::Offset<flatbuffers::String> name = 0,
    Permissions permissions = Permissions_None,
    uint64_t size = 0,
    const Date *modified = 0,
    bool isFile = false,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<PathInfo>>> files = 0,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<PathInfo>>> directories = 0) {
  PathInfoBuilder builder_(_fbb);
  builder_.add_size(size);
  builder_.add_directories(directories);
  builder_.add_files(files);
  builder_.add_modified(modified);
  builder_.add_name(name);
  builder_.add_path(path);
  builder_.add_isFile(isFile);
  builder_.add_permissions(permissions);
  return builder_.Finish();
}

inline flatbuffers::Offset<PathInfo> CreatePathInfoDirect(
    flatbuffers::FlatBufferBuilder &_fbb,
    const char *path = nullptr,
    const char *name = nullptr,
    Permissions permissions = Permissions_None,
    uint64_t size = 0,
    const Date *modified = 0,
    bool isFile = false,
    const std::vector<flatbuffers::Offset<PathInfo>> *files = nullptr,
    const std::vector<flatbuffers::Offset<PathInfo>> *directories = nullptr) {
  return executionGraphGui::serialization::CreatePathInfo(
      _fbb,
      path ? _fbb.CreateString(path) : 0,
      name ? _fbb.CreateString(name) : 0,
      permissions,
      size,
      modified,
      isFile,
      files ? _fbb.CreateVector<flatbuffers::Offset<PathInfo>>(*files) : 0,
      directories ? _fbb.CreateVector<flatbuffers::Offset<PathInfo>>(*directories) : 0);
}

}  // namespace serialization
}  // namespace executionGraphGui

#endif  // FLATBUFFERS_GENERATED_FILESYSTEMINFO_EXECUTIONGRAPHGUI_SERIALIZATION_H_
