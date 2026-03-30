exports.encodeGridIndex = function (message) {
  var bb = popByteBuffer();
  _encodeGridIndex(message, bb);
  return toUint8Array(bb);
}

function _encodeGridIndex(message, bb) {
  // optional int32 x = 1;
  var $x = message.x;
  if ($x !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($x));
  }

  // optional int32 y = 2;
  var $y = message.y;
  if ($y !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($y));
  }
};

exports.decodeGridIndex = function (binary) {
  return _decodeGridIndex(wrapByteBuffer(binary));
}

function _decodeGridIndex(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 x = 1;
      case 1: {
        message.x = readVarint32(bb);
        break;
      }

      // optional int32 y = 2;
      case 2: {
        message.y = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePoint = function (message) {
  var bb = popByteBuffer();
  _encodePoint(message, bb);
  return toUint8Array(bb);
}

function _encodePoint(message, bb) {
  // optional float x = 1;
  var $x = message.x;
  if ($x !== undefined) {
    writeVarint32(bb, 13);
    writeFloat(bb, $x);
  }

  // optional float y = 2;
  var $y = message.y;
  if ($y !== undefined) {
    writeVarint32(bb, 21);
    writeFloat(bb, $y);
  }

  // optional float z = 3;
  var $z = message.z;
  if ($z !== undefined) {
    writeVarint32(bb, 29);
    writeFloat(bb, $z);
  }
};

exports.decodePoint = function (binary) {
  return _decodePoint(wrapByteBuffer(binary));
}

function _decodePoint(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional float x = 1;
      case 1: {
        message.x = readFloat(bb);
        break;
      }

      // optional float y = 2;
      case 2: {
        message.y = readFloat(bb);
        break;
      }

      // optional float z = 3;
      case 3: {
        message.z = readFloat(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePointCloud = function (message) {
  var bb = popByteBuffer();
  _encodePointCloud(message, bb);
  return toUint8Array(bb);
}

function _encodePointCloud(message, bb) {
  // repeated Point points = 1;
  var array$points = message.points;
  if (array$points !== undefined) {
    for (var i = 0; i < array$points.length; i++) {
      var value = array$points[i];
      writeVarint32(bb, 10);
      var nested = popByteBuffer();
      _encodePoint(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodePointCloud = function (binary) {
  return _decodePointCloud(wrapByteBuffer(binary));
}

function _decodePointCloud(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated Point points = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        var values = message.points || (message.points = []);
        values.push(_decodePoint(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeAIRect = function (message) {
  var bb = popByteBuffer();
  _encodeAIRect(message, bb);
  return toUint8Array(bb);
}

function _encodeAIRect(message, bb) {
  // optional int32 x = 1;
  var $x = message.x;
  if ($x !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($x));
  }

  // optional int32 y = 2;
  var $y = message.y;
  if ($y !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($y));
  }

  // optional int32 width = 3;
  var $width = message.width;
  if ($width !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($width));
  }

  // optional int32 height = 4;
  var $height = message.height;
  if ($height !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($height));
  }
};

exports.decodeAIRect = function (binary) {
  return _decodeAIRect(wrapByteBuffer(binary));
}

function _decodeAIRect(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 x = 1;
      case 1: {
        message.x = readVarint32(bb);
        break;
      }

      // optional int32 y = 2;
      case 2: {
        message.y = readVarint32(bb);
        break;
      }

      // optional int32 width = 3;
      case 3: {
        message.width = readVarint32(bb);
        break;
      }

      // optional int32 height = 4;
      case 4: {
        message.height = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeAIImageInfo = function (message) {
  var bb = popByteBuffer();
  _encodeAIImageInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeAIImageInfo(message, bb) {
  // optional int32 confidence = 1;
  var $confidence = message.confidence;
  if ($confidence !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($confidence));
  }

  // optional string absolute_path = 2;
  var $absolute_path = message.absolute_path;
  if ($absolute_path !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $absolute_path);
  }

  // optional AIRect rect = 3;
  var $rect = message.rect;
  if ($rect !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeAIRect($rect, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional float float_val_10 = 10;
  var $float_val_10 = message.float_val_10;
  if ($float_val_10 !== undefined) {
    writeVarint32(bb, 85);
    writeFloat(bb, $float_val_10);
  }

  // optional float float_val_11 = 11;
  var $float_val_11 = message.float_val_11;
  if ($float_val_11 !== undefined) {
    writeVarint32(bb, 93);
    writeFloat(bb, $float_val_11);
  }
};

exports.decodeAIImageInfo = function (binary) {
  return _decodeAIImageInfo(wrapByteBuffer(binary));
}

function _decodeAIImageInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 confidence = 1;
      case 1: {
        message.confidence = readVarint32(bb);
        break;
      }

      // optional string absolute_path = 2;
      case 2: {
        message.absolute_path = readString(bb, readVarint32(bb));
        break;
      }

      // optional AIRect rect = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.rect = _decodeAIRect(bb);
        bb.limit = limit;
        break;
      }

      // optional float float_val_10 = 10;
      case 10: {
        message.float_val_10 = readFloat(bb);
        break;
      }

      // optional float float_val_11 = 11;
      case 11: {
        message.float_val_11 = readFloat(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBoundingBox = function (message) {
  var bb = popByteBuffer();
  _encodeBoundingBox(message, bb);
  return toUint8Array(bb);
}

function _encodeBoundingBox(message, bb) {
  // optional GridIndex corner_1 = 1;
  var $corner_1 = message.corner_1;
  if ($corner_1 !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeGridIndex($corner_1, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GridIndex corner_2 = 2;
  var $corner_2 = message.corner_2;
  if ($corner_2 !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeGridIndex($corner_2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GridIndex corner_3 = 3;
  var $corner_3 = message.corner_3;
  if ($corner_3 !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeGridIndex($corner_3, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GridIndex corner_4 = 4;
  var $corner_4 = message.corner_4;
  if ($corner_4 !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeGridIndex($corner_4, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeBoundingBox = function (binary) {
  return _decodeBoundingBox(wrapByteBuffer(binary));
}

function _decodeBoundingBox(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional GridIndex corner_1 = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.corner_1 = _decodeGridIndex(bb);
        bb.limit = limit;
        break;
      }

      // optional GridIndex corner_2 = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.corner_2 = _decodeGridIndex(bb);
        bb.limit = limit;
        break;
      }

      // optional GridIndex corner_3 = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.corner_3 = _decodeGridIndex(bb);
        bb.limit = limit;
        break;
      }

      // optional GridIndex corner_4 = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.corner_4 = _decodeGridIndex(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSemanticObject = function (message) {
  var bb = popByteBuffer();
  _encodeSemanticObject(message, bb);
  return toUint8Array(bb);
}

function _encodeSemanticObject(message, bb) {
  // optional int32 object_type = 1;
  var $object_type = message.object_type;
  if ($object_type !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($object_type));
  }

  // optional int32 instance_id = 2;
  var $instance_id = message.instance_id;
  if ($instance_id !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($instance_id));
  }

  // optional GridIndex center_point = 3;
  var $center_point = message.center_point;
  if ($center_point !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeGridIndex($center_point, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated bytes field_4_data = 4;
  var array$field_4_data = message.field_4_data;
  if (array$field_4_data !== undefined) {
    for (var i = 0; i < array$field_4_data.length; i++) {
      var value = array$field_4_data[i];
      writeVarint32(bb, 34);
      writeVarint32(bb, value.length), writeBytes(bb, value);
    }
  }

  // optional int32 int32_val_5 = 5;
  var $int32_val_5 = message.int32_val_5;
  if ($int32_val_5 !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($int32_val_5));
  }

  // optional int32 int32_val_6 = 6;
  var $int32_val_6 = message.int32_val_6;
  if ($int32_val_6 !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($int32_val_6));
  }

  // optional int64 timestamp_us = 7;
  var $timestamp_us = message.timestamp_us;
  if ($timestamp_us !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $timestamp_us);
  }

  // optional PointCloud point_cloud = 8;
  var $point_cloud = message.point_cloud;
  if ($point_cloud !== undefined) {
    writeVarint32(bb, 66);
    var nested = popByteBuffer();
    _encodePointCloud($point_cloud, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AIImageInfo ai_image_info = 9;
  var $ai_image_info = message.ai_image_info;
  if ($ai_image_info !== undefined) {
    writeVarint32(bb, 74);
    var nested = popByteBuffer();
    _encodeAIImageInfo($ai_image_info, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional float float_val_10 = 10;
  var $float_val_10 = message.float_val_10;
  if ($float_val_10 !== undefined) {
    writeVarint32(bb, 85);
    writeFloat(bb, $float_val_10);
  }

  // optional float float_val_11 = 11;
  var $float_val_11 = message.float_val_11;
  if ($float_val_11 !== undefined) {
    writeVarint32(bb, 93);
    writeFloat(bb, $float_val_11);
  }

  // optional int32 int32_val_12 = 12;
  var $int32_val_12 = message.int32_val_12;
  if ($int32_val_12 !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($int32_val_12));
  }

  // optional int32 int32_val_13 = 13;
  var $int32_val_13 = message.int32_val_13;
  if ($int32_val_13 !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, intToLong($int32_val_13));
  }

  // optional int32 int32_val_14 = 14;
  var $int32_val_14 = message.int32_val_14;
  if ($int32_val_14 !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, intToLong($int32_val_14));
  }

  // optional int32 int32_val_15 = 15;
  var $int32_val_15 = message.int32_val_15;
  if ($int32_val_15 !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, intToLong($int32_val_15));
  }
};

exports.decodeSemanticObject = function (binary) {
  return _decodeSemanticObject(wrapByteBuffer(binary));
}

function _decodeSemanticObject(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 object_type = 1;
      case 1: {
        message.object_type = readVarint32(bb);
        break;
      }

      // optional int32 instance_id = 2;
      case 2: {
        message.instance_id = readVarint32(bb);
        break;
      }

      // optional GridIndex center_point = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.center_point = _decodeGridIndex(bb);
        bb.limit = limit;
        break;
      }

      // repeated bytes field_4_data = 4;
      case 4: {
        var values = message.field_4_data || (message.field_4_data = []);
        values.push(readBytes(bb, readVarint32(bb)));
        break;
      }

      // optional int32 int32_val_5 = 5;
      case 5: {
        message.int32_val_5 = readVarint32(bb);
        break;
      }

      // optional int32 int32_val_6 = 6;
      case 6: {
        message.int32_val_6 = readVarint32(bb);
        break;
      }

      // optional int64 timestamp_us = 7;
      case 7: {
        message.timestamp_us = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional PointCloud point_cloud = 8;
      case 8: {
        var limit = pushTemporaryLength(bb);
        message.point_cloud = _decodePointCloud(bb);
        bb.limit = limit;
        break;
      }

      // optional AIImageInfo ai_image_info = 9;
      case 9: {
        var limit = pushTemporaryLength(bb);
        message.ai_image_info = _decodeAIImageInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional float float_val_10 = 10;
      case 10: {
        message.float_val_10 = readFloat(bb);
        break;
      }

      // optional float float_val_11 = 11;
      case 11: {
        message.float_val_11 = readFloat(bb);
        break;
      }

      // optional int32 int32_val_12 = 12;
      case 12: {
        message.int32_val_12 = readVarint32(bb);
        break;
      }

      // optional int32 int32_val_13 = 13;
      case 13: {
        message.int32_val_13 = readVarint32(bb);
        break;
      }

      // optional int32 int32_val_14 = 14;
      case 14: {
        message.int32_val_14 = readVarint32(bb);
        break;
      }

      // optional int32 int32_val_15 = 15;
      case 15: {
        message.int32_val_15 = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSemanticMapInfo = function (message) {
  var bb = popByteBuffer();
  _encodeSemanticMapInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeSemanticMapInfo(message, bb) {
  // repeated SemanticObject objects = 1;
  var array$objects = message.objects;
  if (array$objects !== undefined) {
    for (var i = 0; i < array$objects.length; i++) {
      var value = array$objects[i];
      writeVarint32(bb, 10);
      var nested = popByteBuffer();
      _encodeSemanticObject(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional uint32 uint32_val_2 = 2;
  var $uint32_val_2 = message.uint32_val_2;
  if ($uint32_val_2 !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $uint32_val_2);
  }

  // optional uint32 uint32_val_3 = 3;
  var $uint32_val_3 = message.uint32_val_3;
  if ($uint32_val_3 !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $uint32_val_3);
  }

  // optional string clean_record_id = 4;
  var $clean_record_id = message.clean_record_id;
  if ($clean_record_id !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $clean_record_id);
  }
};

exports.decodeSemanticMapInfo = function (binary) {
  return _decodeSemanticMapInfo(wrapByteBuffer(binary));
}

function _decodeSemanticMapInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated SemanticObject objects = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        var values = message.objects || (message.objects = []);
        values.push(_decodeSemanticObject(bb));
        bb.limit = limit;
        break;
      }

      // optional uint32 uint32_val_2 = 2;
      case 2: {
        message.uint32_val_2 = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 uint32_val_3 = 3;
      case 3: {
        message.uint32_val_3 = readVarint32(bb) >>> 0;
        break;
      }

      // optional string clean_record_id = 4;
      case 4: {
        message.clean_record_id = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeTrackPoint = function (message) {
  var bb = popByteBuffer();
  _encodeTrackPoint(message, bb);
  return toUint8Array(bb);
}

function _encodeTrackPoint(message, bb) {
  // optional int64 int64_val_1 = 1;
  var $int64_val_1 = message.int64_val_1;
  if ($int64_val_1 !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $int64_val_1);
  }

  // optional int32 int32_val_2 = 2;
  var $int32_val_2 = message.int32_val_2;
  if ($int32_val_2 !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($int32_val_2));
  }

  // optional string name = 3;
  var $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $name);
  }

  // optional string desc = 4;
  var $desc = message.desc;
  if ($desc !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $desc);
  }

  // optional int32 int32_val_5 = 5;
  var $int32_val_5 = message.int32_val_5;
  if ($int32_val_5 !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($int32_val_5));
  }

  // optional int32 int32_val_6 = 6;
  var $int32_val_6 = message.int32_val_6;
  if ($int32_val_6 !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($int32_val_6));
  }

  // optional int64 oneof_int64_7 = 7;
  var $oneof_int64_7 = message.oneof_int64_7;
  if ($oneof_int64_7 !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $oneof_int64_7);
  }

  // optional int64 oneof_int64_8 = 8;
  var $oneof_int64_8 = message.oneof_int64_8;
  if ($oneof_int64_8 !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $oneof_int64_8);
  }

  // optional float oneof_float_9 = 9;
  var $oneof_float_9 = message.oneof_float_9;
  if ($oneof_float_9 !== undefined) {
    writeVarint32(bb, 77);
    writeFloat(bb, $oneof_float_9);
  }

  // optional string oneof_string_10 = 10;
  var $oneof_string_10 = message.oneof_string_10;
  if ($oneof_string_10 !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $oneof_string_10);
  }
};

exports.decodeTrackPoint = function (binary) {
  return _decodeTrackPoint(wrapByteBuffer(binary));
}

function _decodeTrackPoint(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 int64_val_1 = 1;
      case 1: {
        message.int64_val_1 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 int32_val_2 = 2;
      case 2: {
        message.int32_val_2 = readVarint32(bb);
        break;
      }

      // optional string name = 3;
      case 3: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string desc = 4;
      case 4: {
        message.desc = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 int32_val_5 = 5;
      case 5: {
        message.int32_val_5 = readVarint32(bb);
        break;
      }

      // optional int32 int32_val_6 = 6;
      case 6: {
        message.int32_val_6 = readVarint32(bb);
        break;
      }

      // optional int64 oneof_int64_7 = 7;
      case 7: {
        message.oneof_int64_7 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 oneof_int64_8 = 8;
      case 8: {
        message.oneof_int64_8 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional float oneof_float_9 = 9;
      case 9: {
        message.oneof_float_9 = readFloat(bb);
        break;
      }

      // optional string oneof_string_10 = 10;
      case 10: {
        message.oneof_string_10 = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

function pushTemporaryLength(bb) {
  var length = readVarint32(bb);
  var limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  var low = value.low;
  var high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

var f32 = new Float32Array(1);
var f32_u8 = new Uint8Array(f32.buffer);

var f64 = new Float64Array(1);
var f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

var bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  var bytes = bb.bytes;
  var limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  var bytes = bb.bytes;
  var offset = bb.offset;
  var limit = bb.limit;
  var finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    var newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  var offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  var offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  var offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  var offset = advance(bb, count);
  var fromCharCode = String.fromCharCode;
  var bytes = bb.bytes;
  var invalid = '\uFFFD';
  var text = '';

  for (var i = 0; i < count; i++) {
    var c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  var n = text.length;
  var byteCount = 0;

  // Write the byte count first
  for (var i = 0; i < n; i++) {
    var c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  var offset = grow(bb, byteCount);
  var bytes = bb.bytes;

  // Then write the bytes
  for (var i = 0; i < n; i++) {
    var c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  var offset = grow(bb, buffer.limit);
  var from = bb.bytes;
  var to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (var i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  var offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  var offset = advance(bb, 4);
  var bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  var offset = grow(bb, 4);
  var bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  var offset = advance(bb, 8);
  var bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  var offset = grow(bb, 8);
  var bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  var offset = advance(bb, 4);
  var bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  var offset = grow(bb, 4);
  var bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  var c = 0;
  var value = 0;
  var b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  var part0 = 0;
  var part1 = 0;
  var part2 = 0;
  var b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  var part0 = value.low >>> 0;
  var part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  var part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  var size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  var offset = grow(bb, size);
  var bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  var value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  var value = readVarint64(bb, /* unsigned */ false);
  var low = value.low;
  var high = value.high;
  var flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  var low = value.low;
  var high = value.high;
  var flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
