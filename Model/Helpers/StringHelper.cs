using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Security.Cryptography;

namespace Model.Helpers {
    public class StringHelper {
        public static string CreateSha256 (string text, string salt) {
            using (SHA256 sha = SHA256.Create()) {
                var bf = new BinaryFormatter();
                using (var stream = new MemoryStream()) {
                    bf.Serialize(stream, text + salt);
                    return Convert.ToBase64String(sha.ComputeHash(stream.GetBuffer()));
                }
            }
        }
        public static bool CompareSha256(string plainText, string sha256base64) {
            using (SHA256 sha = SHA256.Create()) {
                var bf = new BinaryFormatter();
                using (var stream = new MemoryStream()) {
                    bf.Serialize(stream, plainText);
                    return Convert.ToBase64String(sha.ComputeHash(stream.GetBuffer())) == sha256base64;
                }
            }
        }
    }
}
